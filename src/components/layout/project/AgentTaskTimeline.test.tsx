// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import AgentTaskTimeline from '@/components/layout/project/AgentTaskTimeline';
import { groupTimelineEvents } from '@/components/layout/project/agentTaskEvent.utils';
import type { AgentTaskEvent } from '@/types/agent.type';

/*
  #189 / BE #600. 코딩 에이전트가 도는 동안 한 일(`CODING_*`)이 한 줄씩 온다. 새 앱을 처음부터
  만들면 한 실행에 수십 줄이라, 이어진 한 일은 끝 몇 줄만 보이고 앞은 접는다. 다른 줄과 모르는
  종류는 그대로 그린다.
*/

afterEach(() => cleanup());

let nextId = 1;

function event(type: string, message: string, extra: Partial<AgentTaskEvent> = {}): AgentTaskEvent {
  return {
    eventId: nextId++,
    taskId: 'task-1',
    type,
    status: 'RUNNING',
    message,
    stepIndex: 1,
    stepTotal: 1,
    agentType: 'CODE',
    createdAt: '2026-11-26T18:04:00+09:00',
    ...extra,
  } as AgentTaskEvent;
}

function edits(count: number) {
  return Array.from({ length: count }, (_, i) => event('CODING_EDIT', `파일 고치기 · file-${i + 1}.css`));
}

describe('AgentTaskTimeline 한 일 묶기', () => {
  it('이어진 한 일이 많으면 끝 세 줄만 보이고 앞은 몇 개인지 말한다', () => {
    render(
      <AgentTaskTimeline
        events={[event('STEP_STARTED', '코드를 만들고 있습니다'), ...edits(10), event('PREVIEW_STARTING', '바뀐 코드로 프리뷰를 띄우고 있습니다')]}
      />,
    );

    expect(screen.getByText('코드를 만들고 있습니다')).toBeTruthy();
    expect(screen.queryByText('파일 고치기 · file-7.css')).toBeNull();
    expect(screen.getByText('파일 고치기 · file-8.css')).toBeTruthy();
    expect(screen.getByText('파일 고치기 · file-10.css')).toBeTruthy();
    expect(screen.getByText('바뀐 코드로 프리뷰를 띄우고 있습니다')).toBeTruthy();

    const toggle = screen.getByRole('button', { name: /앞의 활동 7개 보기/ });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);
    expect(screen.getByText('파일 고치기 · file-1.css')).toBeTruthy();
    expect(screen.getByRole('button', { name: /앞의 활동 접기/ }).getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: /앞의 활동 접기/ }));
    expect(screen.queryByText('파일 고치기 · file-1.css')).toBeNull();
  });

  it('네 줄까지는 접지 않는다 — 접는 단추가 한 줄보다 자리를 더 먹는다', () => {
    render(<AgentTaskTimeline events={edits(4)} />);

    expect(screen.getByText('파일 고치기 · file-1.css')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /앞의 활동/ })).toBeNull();
  });

  it('펼쳐 둔 묶음은 새 줄이 와도 펼친 채다', () => {
    const first = edits(6);
    const { rerender } = render(<AgentTaskTimeline events={first} />);
    fireEvent.click(screen.getByRole('button', { name: /앞의 활동 3개 보기/ }));

    rerender(<AgentTaskTimeline events={[...first, event('CODING_COMMAND', '명령 실행 · npm run build')]} />);

    expect(screen.getByText('파일 고치기 · file-1.css')).toBeTruthy();
    expect(screen.getByText('명령 실행 · npm run build')).toBeTruthy();
  });

  it('모르는 종류와 실패 줄은 묶지 않고 그대로 그린다', () => {
    render(
      <AgentTaskTimeline
        events={[
          ...edits(2),
          event('SOMETHING_NEW', '새 종류의 줄'),
          event('FAILED', '빌드에 실패했습니다', { status: 'FAILED' }),
        ]}
      />,
    );

    expect(screen.getByText('새 종류의 줄')).toBeTruthy();
    expect(screen.getByText('빌드에 실패했습니다')).toBeTruthy();
  });

  it('긴 줄은 마우스를 올리면 전체가 보인다', () => {
    const long = `파일 고치기 · …${'d/'.repeat(60)}Button.tsx`;
    render(<AgentTaskTimeline events={[event('CODING_EDIT', long)]} live={false} />);

    expect(screen.getByTitle(long)).toBeTruthy();
  });
});

describe('groupTimelineEvents', () => {
  it('사이에 다른 이벤트가 끼면 새 묶음이고, 묶음 열쇠는 첫 줄이다', () => {
    const a = edits(2);
    const step = event('STEP_STARTED', '배포하고 있습니다');
    const b = [event('CODING_READ', '파일 읽기 · a.css'), event('CODING_MESSAGE', '에이전트: 고치겠습니다')];

    const items = groupTimelineEvents([...a, step, ...b]);

    expect(items.map((item) => item.kind)).toEqual(['activity', 'event', 'activity']);
    expect(items[0]).toMatchObject({ key: a[0].eventId, events: a });
    expect(items[2]).toMatchObject({ key: b[0].eventId, events: b });
  });
});
