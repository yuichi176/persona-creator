import Header from './Header'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header className="mb-10" />
      <main>{children}</main>
    </>
  )
}
