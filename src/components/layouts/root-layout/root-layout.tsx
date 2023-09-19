import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface IRootLayoutProps {
  children?: ReactNode;
}

export const RootLayout = (props: IRootLayoutProps) => {
  return (
    <>
      {/*<Topbar/>*/}
      <main className="flex flex-row">
        {/*<LeftSidebar />*/}
        <section className="main-container">
          <div className="w-full max-w-4xl">{props.children ?? <Outlet />}</div>
        </section>
        {/*<RightSidebar/>*/}
      </main>
      {/*<Bottombar />*/}
    </>
  );
};
