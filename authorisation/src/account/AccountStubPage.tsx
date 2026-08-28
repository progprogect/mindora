export default function AccountStubPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
          <span className="font-bold text-base text-sw-dark tracking-tight">
            SuccessWise<span className="text-sw-blue">.ai</span>
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col px-4 pt-12 max-w-lg mx-auto w-full">
        <h1 className="text-2xl font-extrabold text-sw-dark text-center">{title}</h1>
      </main>
    </div>
  )
}
