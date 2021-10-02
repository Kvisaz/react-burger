import styles from '../order-feed-item-status.module.css';

const STATUS_TEXTS: Record<string, string> = {
  'done': 'Выполнен',
};

const STATUS_CLASSNAMES: Record<string, string> = {
  'done': `text text_type_main-default ${styles.success}`,
};

export function getStatusText(status: string): string {
  return STATUS_TEXTS[status] ?? status;
}

export function getStatusClassname(status: string): string {
  return STATUS_CLASSNAMES[status] ?? 'text text_type_main-default';
}