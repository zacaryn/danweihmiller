import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiCheck, FiX } from 'react-icons/fi';
import { submitContactMessage } from '../../services/contact-api';
import { trackPixel } from '../../lib/meta-pixel';
import { button } from '../../styles/buttons';
import { AGENT_PHONE } from '../../config/agent';
import { TOUR_TIMES, formatTour, todayIso } from '../../lib/tour-date';

const NAVY = '#0E1F45';

const TOPICS = ['Buying', 'Selling', 'Relocating', 'Home value', 'Something else'];
const PLACEHOLDERS = {
  Buying: 'What are you looking for? Area, budget, timing…',
  Selling: 'Tell Dan about your home and your timing…',
  Relocating: 'Where are you moving from, and when?',
  'Home value': 'Your address, and anything recently updated…',
  'Something else': 'How can Dan help?',
};

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem 0.9rem;

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Full = styled.div`
  grid-column: 1 / -1;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${p => p.theme.colors.primary};

  span {
    font-weight: 500;
    color: ${p => p.theme.colors.darkGray};
  }
`;

const control = `
  width: 100%;
  min-width: 0;
  border: 1px solid rgba(14, 31, 69, 0.18);
  border-radius: 6px;
  background: #fff;
  font: inherit;
  font-size: 1rem; /* 16px keeps iOS from zooming on focus */
  color: #1A2B45;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #6b7690;
  }

  &:focus {
    outline: none;
    border-color: ${NAVY};
    box-shadow: 0 0 0 3px rgba(14, 31, 69, 0.12);
  }
`;

const Input = styled.input`
  ${control}
  height: 2.9rem;
  padding: 0 0.85rem;
`;

const DateInput = styled.input`
  ${control}
  height: 2.9rem;
  padding: 0 0.85rem;
  appearance: none;
  -webkit-appearance: none;
  color: ${p => (p.value ? '#1A2B45' : '#6b7690')};
  cursor: pointer;

  &::-webkit-date-and-time-value {
    text-align: left;
  }
`;

const Select = styled.select`
  ${control}
  height: 2.9rem;
  padding: 0 0.75rem;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  ${control}
  min-height: 6.25rem;
  padding: 0.75rem 0.85rem;
  line-height: 1.5;
  resize: vertical;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Chip = styled.button`
  height: 2.25rem;
  padding: 0 0.9rem;
  border-radius: 999px;
  border: 1px solid ${p => (p.$on ? NAVY : 'rgba(14, 31, 69, 0.2)')};
  background: ${p => (p.$on ? NAVY : '#fff')};
  color: ${p => (p.$on ? '#fff' : NAVY)};
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    border-color: ${NAVY};
  }
`;

const Regarding = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: ${p => p.theme.colors.lightGray};
  font-size: 0.88rem;
  color: ${p => p.theme.colors.text};

  strong {
    font-weight: 700;
  }

  span {
    flex: 1;
    min-width: 0;
  }

  button {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${p => p.theme.colors.darkGray};
    cursor: pointer;
  }
`;

const Submit = styled.button`
  ${button('primary', 'lg')}
  width: 100%;
`;

const Note = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${p => p.theme.colors.darkGray};
  text-align: center;

  &[data-error] {
    color: #b42318;
    font-size: 0.88rem;
    font-weight: 600;
  }
`;

const Success = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 1.25rem;
  border-radius: 10px;
  background: #ecf6ee;
  color: #1e5a2a;
  line-height: 1.55;

  svg {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.1rem;
  }

  strong {
    display: block;
    font-size: 1.05rem;
    margin-bottom: 0.15rem;
  }
`;

const EMPTY = { name: '', email: '', phone: '', prefer: 'Call or text', tourDate: '', tourTime: TOUR_TIMES[0], message: '' };

/** Compact contact form: topic chips, two-column fields, inline validation, success state. */
const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const topicFromUrl = searchParams.get('topic') || searchParams.get('context') || '';
  const [regarding, setRegarding] = useState(topicFromUrl);
  const [topic, setTopic] = useState(/showing|listing/i.test(topicFromUrl) ? 'Buying' : '');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ sending: false, done: false, error: null, name: '' });

  useEffect(() => {
    setRegarding(topicFromUrl);
    if (topicFromUrl) {
      setForm((f) => ({ ...f, message: f.message || "I'd like to learn more about this property." }));
    }
  }, [topicFromUrl]);

  // tour preference only matters when someone wants to see a home
  const askTour = topic === 'Buying' || /showing|listing|MLS/i.test(regarding);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus((s) => ({ ...s, error: 'Please add your name, email and a short message.' }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus((s) => ({ ...s, error: 'Please enter a valid email address.' }));
      return;
    }
    setStatus({ sending: true, done: false, error: null, name: '' });
    const context = [regarding, topic].filter(Boolean).join(' · ') || undefined;
    const tourDate = askTour ? formatTour(form.tourDate, form.tourTime) || undefined : undefined;
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        context,
        message: `${form.message.trim()}\n\nBest way to reach me: ${form.prefer}`,
        tourDate,
      });
      trackPixel('Lead', {
        content_name: context || 'Contact form',
        content_category: /showing request/i.test(regarding) ? 'showing_request' : (topic || 'contact').toLowerCase(),
      });
      setStatus({ sending: false, done: true, error: null, name: form.name.trim().split(' ')[0] });
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        sending: false,
        done: false,
        error: err.message || `Something went wrong. Please call or text Dan at ${AGENT_PHONE}.`,
        name: '',
      });
    }
  };

  if (status.done) {
    return (
      <Success role="status">
        <FiCheck aria-hidden />
        <div>
          <strong>Thanks, {status.name}! Your message is on its way.</strong>
          Dan will be in touch within one business day. Need him sooner? Call or text {AGENT_PHONE}.
        </div>
      </Success>
    );
  }

  return (
    <Form onSubmit={submit} noValidate>
      {regarding && (
        <Full>
          <Regarding>
            <span>
              <strong>Regarding:</strong> {regarding}
            </span>
            <button type="button" aria-label="Remove" onClick={() => setRegarding('')}>
              <FiX aria-hidden />
            </button>
          </Regarding>
        </Full>
      )}

      <Full>
        <Field as="fieldset" style={{ border: 0, padding: 0, margin: 0 }}>
          <Label as="legend" style={{ marginBottom: '0.45rem' }}>
            What can Dan help with?
          </Label>
          <Chips>
            {TOPICS.map((t) => (
              <Chip key={t} type="button" $on={topic === t} aria-pressed={topic === t} onClick={() => setTopic(topic === t ? '' : t)}>
                {t}
              </Chip>
            ))}
          </Chips>
        </Field>
      </Full>

      <Field>
        <Label htmlFor="cf-name">Name</Label>
        <Input id="cf-name" autoComplete="name" value={form.name} onChange={set('name')} required />
      </Field>
      <Field>
        <Label htmlFor="cf-email">Email</Label>
        <Input id="cf-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
      </Field>
      <Field>
        <Label htmlFor="cf-phone">
          Phone <span>(optional)</span>
        </Label>
        <Input id="cf-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
      </Field>
      <Field>
        <Label htmlFor="cf-prefer">Best way to reach you</Label>
        <Select id="cf-prefer" value={form.prefer} onChange={set('prefer')}>
          <option>Call or text</option>
          <option>Call</option>
          <option>Text</option>
          <option>Email</option>
        </Select>
      </Field>

      {askTour && (
        <>
          <Field>
            <Label htmlFor="cf-tour-date">
              Preferred tour date <span>(optional)</span>
            </Label>
            <DateInput id="cf-tour-date" type="date" min={todayIso()} value={form.tourDate} onChange={set('tourDate')} />
          </Field>
          <Field>
            <Label htmlFor="cf-tour-time">Time of day</Label>
            <Select id="cf-tour-time" value={form.tourTime} onChange={set('tourTime')}>
              {TOUR_TIMES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
        </>
      )}

      <Full>
        <Field>
          <Label htmlFor="cf-message">Message</Label>
          <Textarea
            id="cf-message"
            rows={4}
            value={form.message}
            onChange={set('message')}
            placeholder={PLACEHOLDERS[topic] || 'How can Dan help?'}
            required
          />
        </Field>
      </Full>

      <Full>
        <Submit type="submit" disabled={status.sending}>
          {status.sending ? 'Sending…' : 'Send Message'}
        </Submit>
      </Full>
      <Full>
        {status.error ? (
          <Note data-error role="alert">
            {status.error}
          </Note>
        ) : (
          <Note>Dan replies personally, usually within one business day. Your info is never shared.</Note>
        )}
      </Full>
    </Form>
  );
};

export default ContactForm;
