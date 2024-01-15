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
    <main className="flex min-h-screen items-center justify-center select-none bg-zinc-100">
      <Tabs defaultValue="currency">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-200">
          <TabsTrigger value="currency">Devises</TabsTrigger>
          <TabsTrigger value="length">Longueurs</TabsTrigger>
          <TabsTrigger value="mass">Masses</TabsTrigger>
          <TabsTrigger value="volume">Volumes</TabsTrigger>
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
