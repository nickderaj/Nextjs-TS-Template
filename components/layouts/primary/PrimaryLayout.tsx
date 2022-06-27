import Head from 'next/head';

export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {/* Navbar here */}
        <main>{children}</main>
        <div className="m-auto" />
        {/* Footer here */}
      </div>
    </>
  );
};

export default PrimaryLayout;
