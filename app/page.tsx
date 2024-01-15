import type { Metadata } from 'next'
import Icon from '@/assets/images/icon.svg'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'

import CurrencyForm from '@/components/forms/currency'
import LengthForm from '@/components/forms/lenght'
import MassForm from '@/components/forms/mass'
import VolumeForm from '@/components/forms/volume'

export const metadata: Metadata = {
  title: 'Merge',
  icons: [{ rel: 'icon', url: Icon.src }]
}

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <Tabs defaultValue="currency">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-200 dark:bg-zinc-900">
          <TabsTrigger value="currency" className="dark:data-[state=active]:bg-zinc-800">Devises</TabsTrigger>
          <TabsTrigger value="length" className="dark:data-[state=active]:bg-zinc-800">Longueurs</TabsTrigger>
          <TabsTrigger value="mass" className="dark:data-[state=active]:bg-zinc-800">Masses</TabsTrigger>
          <TabsTrigger value="volume" className="dark:data-[state=active]:bg-zinc-800">Volumes</TabsTrigger>
        </TabsList>
        <TabsContent value="currency" className='w-[60rem]'>
          <CurrencyForm />
        </TabsContent>
        <TabsContent value="length" className='w-[60rem]'>
          <LengthForm />
        </TabsContent>
        <TabsContent value="mass" className='w-[60rem]'>
          <MassForm />
        </TabsContent>
        <TabsContent value="volume" className='w-[60rem]'>
          <VolumeForm />
        </TabsContent>
      </Tabs>
    </main>
  )
}
