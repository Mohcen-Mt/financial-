
import { I18nProvider } from '@/contexts/i18n-provider';
import { MainLayoutClient } from './main-layout-client';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <MainLayoutClient>{children}</MainLayoutClient>
    </I18nProvider>
  );
}
