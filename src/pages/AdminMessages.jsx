import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaEnvelopeOpen, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import {
  deleteMessage,
  fetchContactMessages,
  markMessageRead,
} from '../services/contact-messages-service';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button`
  padding: 0.45rem 0.85rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  background: ${props => (props.$active ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.$active ? '#fff' : props.theme.colors.text)};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props =>
      props.$active ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const Stats = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const Card = styled.li`
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.small};
`;

const CardButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem 1.1rem;
  border: none;
  background: ${props => (props.$unread ? 'rgba(14, 31, 69, 0.04)' : 'transparent')};
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: start;

  &:hover {
    background: rgba(14, 31, 69, 0.06);
  }
`;

const PreviewName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-size: 1.05rem;
`;

const PreviewMeta = styled.span`
  display: block;
  font-size: 0.82rem;
  color: ${props => props.theme.colors.darkGray};
  margin-top: 0.2rem;
`;

const PreviewSnippet = styled.span`
  display: block;
  margin-top: 0.45rem;
  font-size: 0.92rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Badge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.45rem;
  border-radius: 2px;
  background: ${props => (props.$unread ? '#0E1F45' : '#E8E9ED')};
  color: ${props => (props.$unread ? '#fff' : props.theme.colors.darkGray)};
  white-space: nowrap;
`;

const Detail = styled.div`
  padding: 0 1.1rem 1.1rem;
  border-top: ${props => props.theme.borders.subtle};
`;

const DetailBody = styled.div`
  padding-top: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  white-space: pre-wrap;
`;

const DetailRow = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.88rem;
  color: ${props => props.theme.colors.darkGray};

  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  border: 1px solid
    ${props => (props.$danger ? '#c62828' : props.theme.colors.primary)};
  background: ${props => (props.$primary ? props.theme.colors.primary : 'transparent')};
  color: ${props =>
    props.$primary ? '#fff' : props.$danger ? '#c62828' : props.theme.colors.primary};

  &:hover {
    opacity: 0.92;
  }
`;

const Empty = styled.p`
  text-align: center;
  padding: 2.5rem 1rem;
  color: ${props => props.theme.colors.darkGray};
`;

const ErrorBox = styled.div`
  padding: 0.75rem 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
`;

const Loading = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.darkGray};
  padding: 2rem;
`;

function formatWhen(iso) {
  return new Date(iso).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('unread');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not load messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === 'unread') return messages.filter(m => !m.is_read);
    if (filter === 'read') return messages.filter(m => m.is_read);
    return messages;
  }, [messages, filter]);

  const counts = useMemo(
    () => ({
      all: messages.length,
      unread: messages.filter(m => !m.is_read).length,
      read: messages.filter(m => m.is_read).length,
    }),
    [messages]
  );

  const toggleExpand = async (msg) => {
    const opening = expandedId !== msg.id;
    setExpandedId(opening ? msg.id : null);
    if (opening && !msg.is_read) {
      try {
        await markMessageRead(msg.id);
        setMessages(prev =>
          prev.map(m => (m.id === msg.id ? { ...m, is_read: true } : m))
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error(err);
      alert('Could not delete message.');
    }
  };

  if (loading) return <Loading>Loading messages…</Loading>;
  if (error) return <ErrorBox>{error}</ErrorBox>;

  return (
    <Wrap>
      <Toolbar>
        <FilterGroup>
          <FilterChip $active={filter === 'unread'} onClick={() => setFilter('unread')}>
            Unread ({counts.unread})
          </FilterChip>
          <FilterChip $active={filter === 'all'} onClick={() => setFilter('all')}>
            All ({counts.all})
          </FilterChip>
          <FilterChip $active={filter === 'read'} onClick={() => setFilter('read')}>
            Read ({counts.read})
          </FilterChip>
        </FilterGroup>
        <Stats>Contact form submissions · stored in Supabase</Stats>
      </Toolbar>

      {filtered.length === 0 ? (
        <Empty>
          {filter === 'unread' ? 'No unread messages.' : 'No messages in this view.'}
        </Empty>
      ) : (
        <List>
          {filtered.map(msg => (
            <Card key={msg.id}>
              <CardButton
                type="button"
                $unread={!msg.is_read}
                onClick={() => toggleExpand(msg)}
              >
                <div>
                  <PreviewName>{msg.name}</PreviewName>
                  <PreviewMeta>{msg.email} · {formatWhen(msg.created_at)}</PreviewMeta>
                  <PreviewSnippet>{msg.message}</PreviewSnippet>
                </div>
                <Badge $unread={!msg.is_read}>
                  {msg.is_read ? 'Read' : 'New'}
                </Badge>
              </CardButton>
              {expandedId === msg.id && (
                <Detail>
                  <DetailRow>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${msg.email}`}>{msg.email}</a>
                  </DetailRow>
                  {msg.phone && (
                    <DetailRow>
                      <strong>Phone:</strong>{' '}
                      <a href={`tel:${msg.phone.replace(/\D/g, '')}`}>{msg.phone}</a>
                    </DetailRow>
                  )}
                  {msg.context && (
                    <DetailRow>
                      <strong>Topic:</strong> {msg.context}
                    </DetailRow>
                  )}
                  {msg.email_delivered === false && msg.email_error && (
                    <DetailRow>
                      Email not sent yet: {msg.email_error}
                    </DetailRow>
                  )}
                  <DetailBody>{msg.message}</DetailBody>
                  <Actions>
                    <ActionBtn
                      $primary
                      type="button"
                      onClick={() => window.open(`mailto:${msg.email}`, '_blank')}
                    >
                      <FaExternalLinkAlt /> Reply in email
                    </ActionBtn>
                    {!msg.is_read && (
                      <ActionBtn
                        type="button"
                        onClick={async e => {
                          e.stopPropagation();
                          await markMessageRead(msg.id);
                          setMessages(prev =>
                            prev.map(m =>
                              m.id === msg.id ? { ...m, is_read: true } : m
                            )
                          );
                        }}
                      >
                        <FaEnvelopeOpen /> Mark read
                      </ActionBtn>
                    )}
                    <ActionBtn $danger type="button" onClick={e => handleDelete(msg.id, e)}>
                      <FaTrash /> Delete
                    </ActionBtn>
                  </Actions>
                </Detail>
              )}
            </Card>
          ))}
        </List>
      )}
    </Wrap>
  );
};

export default AdminMessages;
