import { Bottombar } from '@components/layouts/bottombar';
import { Sidebar } from '@components/layouts/sidebar';
import { Topbar } from '@components/layouts/topbar';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface IRootLayoutProps {
  children?: ReactNode;
}

export const RootLayout = (props: IRootLayoutProps) => {
  return (
    <>
      <Topbar />
      <main className="flex flex-row">
        <Sidebar />
        <section className="main-container">
          <div className="w-full max-w-2xl">{props.children ?? <Outlet />}</div>
        </section>
        {/*<RightSidebar/>*/}
      </main>
      <Bottombar />
    </>
  );
};
