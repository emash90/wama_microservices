"use client";
import { ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  description?: string;
  children: ReactNode;
  title?: string;
};

const PageContainer = ({ title, description = "", children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
