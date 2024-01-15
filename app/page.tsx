import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'

import CurrencyForm from '@/components/forms/currency'
import MetricsForm from '@/components/forms/metrics'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center select-none bg-zinc-100">
      <Tabs defaultValue="currency">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-200">
          <TabsTrigger value="currency">Devises</TabsTrigger>
          <TabsTrigger value="metrics">Unités Métriques</TabsTrigger>
        </TabsList>
        <TabsContent value="currency" className='w-[60rem]'>
          <CurrencyForm />
        </TabsContent>
        <TabsContent value="metrics" className='w-[60rem]'>
          <MetricsForm />
        </TabsContent>
      </Tabs>
    </main>
  )
}
