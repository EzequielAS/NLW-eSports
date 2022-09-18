import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown, CaretUp, Check } from 'phosphor-react'
import { Game } from '../../App'

interface SelectProps {
  placeholder: string;
  options: Game[];
  name: string;
}

export function Select({ placeholder, options, name }: SelectProps){
    return (
      <div className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
        <SelectPrimitive.Root name={name}>
          <SelectPrimitive.Trigger className='w-full flex items-center justify-between'>
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon>
                  <CaretDown />
              </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
              <SelectPrimitive.Content className='bg-zinc-800 rounded shadow-sm'>
                  <SelectPrimitive.ScrollUpButton>
                      <CaretUp />
                  </SelectPrimitive.ScrollUpButton>
                  <SelectPrimitive.Viewport className='p-1'>
                      {options.map(option => (
                          <SelectPrimitive.Item 
                            className='text-sm text-zinc-50 flex items-center h-6 py-4 px-2 relative gap-2 cursor-pointer hover:bg-zinc-900' 
                            key={option.id} 
                            value={option.id}
                          >
                            <SelectPrimitive.ItemText>{option.title}</SelectPrimitive.ItemText>
                            <SelectPrimitive.ItemIndicator>
                              <Check />
                            </SelectPrimitive.ItemIndicator>
                          </SelectPrimitive.Item>
                      ))}
                  </SelectPrimitive.Viewport>
                  <SelectPrimitive.ScrollDownButton>
                      <CaretDown />
                  </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    )
}