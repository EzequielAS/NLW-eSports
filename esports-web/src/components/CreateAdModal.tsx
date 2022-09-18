import { FormEvent, useState } from 'react'
import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { Select } from './Form/Select'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
import { Game } from '../App'

interface CreateAdModal {
  games: Game[]
}

export function CreateAdModal({ games }: CreateAdModal) {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
    } catch(err) {
      console.log(err)
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay  className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>
        
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor='game'>Qual o game</label>
            <Select 
              options={games}
              placeholder="Selecione o game que deseja jogar"
              name='game'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input 
              type="text" 
              name="name"
              id="name"
              placeholder='Como te chamam dentro do game?' 
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input 
                type="number" 
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder='Tudo bem ser ZERO' 
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu discord?</label>
              <Input 
                type="text" 
                name="discord"
                id="discord"
                placeholder='Usuario#0000' 
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Quando costuma jogar?</label>
              <ToggleGroup.Root 
                onValueChange={setWeekDays}
                value={weekDays}
                className='grid grid-cols-4 gap-2' 
                type="multiple"
              >
                <ToggleGroup.Item 
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input 
                  id="hourStart" 
                  type="time" 
                  placeholder='De' 
                  name="hourStart"
                />
                <Input 
                  id="hourEnd" 
                  type="time" 
                  placeholder='Até' 
                  name="hourEnd"
                />
              </div>
            </div>
          </div>

          <div className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root 
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked == true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              id='chat' 
              className='w-6 h-6 p-1 rounded bg-zinc-900'
            >
              <Checkbox.Indicator>
                <Check size={16} className='text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor='chat'>Costumo me conectar no ao chat de voz</label>
          </div>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button 
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}