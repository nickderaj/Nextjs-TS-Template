import Head from 'next/head';

type Props = {
  title: string;
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Navbar here */}
      <main>{children}</main>
      <div className="m-auto" />
      {/* Footer here */}
    </>
  );
};

export default PrimaryLayout;
