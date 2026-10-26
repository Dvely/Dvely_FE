import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

/*
  알림은 **아직 서버가 없다.** 그래서 목록은 비어 있고, 화면은 항상 빈 상태를 보여준다.

  예전에는 `@/mocks` 의 네 건을 그대로 그렸다. 그중 하나가 "NEW: 분석 대시보드에서
  프로젝트 성과를 확인하세요" 였는데, 그 화면은 존재하지 않았다 — 알림을 눌러 찾아간
  사용자는 빈 페이지를 만났다. 없는 기능을 알림으로 광고하는 쪽이 알림이 하나도 없는
  쪽보다 나쁘다.

  아래 타입과 카드는 남겨 둔다. 서버가 생기면 `notificationItems` 를 질의 결과로
  바꾸는 것 하나로 끝나도록.
*/

type NotificationTab = 'updates' | 'messages';

type NotificationItem = {
  id: string;
  tab: NotificationTab;
  title: string;
  description: string;
  dateLabel: string;
};

const notificationItems: NotificationItem[] = [];

type NotificationFilter = 'all' | NotificationTab;

function NotificationCard({ item }: { item: NotificationItem }) {
  return (
    <article className="flex flex-col">
      <h3 className="text-[16px] leading-snug font-extrabold text-[#0f172a]">{item.title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[#64748b]">{item.description}</p>
      <p className="mt-3 text-[13px] font-medium text-[#94a3b8]">{item.dateLabel}</p>
    </article>
  );
}

function NotificationsPanel() {
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const { t } = useTranslation();

  const tabs = useMemo(
    () => [
      { value: 'all' as const, label: t('notifications.tabs.all') },
      { value: 'updates' as const, label: t('notifications.tabs.updates') },
      { value: 'messages' as const, label: t('notifications.tabs.messages') },
    ],
    [t],
  );

  const filteredItems = useMemo(() => {
    if (filter === 'all') return notificationItems;
    return notificationItems.filter((item) => item.tab === filter);
  }, [filter]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 px-5 pt-5 sm:px-6">
        {tabs.map((tab) => {
          const isActive = filter === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={cn(
                'rounded-full px-4 py-2 text-[13px] font-semibold transition',
                isActive
                  ? 'bg-[#f1f5f9] text-[#111827]'
                  : 'text-[#94a3b8] hover:bg-[#f8fafc] hover:text-[#475569]',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
        {filteredItems.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredItems.map((item, index) => (
              <div key={item.id}>
                <NotificationCard item={item} />
                {index < filteredItems.length - 1 ? (
                  <div className="mt-6 h-px w-full bg-[#e2e8f0]" />
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] px-6 text-center">
            <p className="text-[14px] font-medium text-[#64748b]">{t('notifications.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
