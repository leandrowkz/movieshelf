import React, { useState, type HTMLAttributes, useRef } from 'react'
import type { CountryCode } from '@leandrowkz/tmdb'
import { CountryFlag, Country } from 'src/types'
import styles from './styles.module.css'
import classNames from 'classnames'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { Dropdown } from '../Dropdown'
import { Heading } from '../Heading'
import { Input } from '../Input'

interface ShowProvidersCountrySelectorProps
  extends HTMLAttributes<HTMLDivElement> {
  country: CountryCode
  onCountryChange: (country: CountryCode) => void
}

export function ShowProvidersCountrySelector({
  country,
  className,
  onCountryChange,
  ...props
}: ShowProvidersCountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const classes = classNames(styles.dropdown, className)
  const countryCodes = Object.keys(Country) as CountryCode[]
  const countryName = Country[country]
  const countryFlag = CountryFlag[country]

  const handleOpen = () => {
    setSearch('')
    setIsOpen(true)
    setTimeout(() => input?.current?.focus(), 150)
  }

  return (
    <Dropdown.Wrapper {...props} className={classes}>
      <Dropdown.Trigger className={styles.trigger}>
        <Heading level={2} className={styles.heading}>
          {countryName} {countryFlag}
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </Heading>
      </Dropdown.Trigger>
      <Dropdown.Menu
        className={styles.menu}
        onOpen={handleOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dropdown.Header className={styles.search}>
          <Input
            className={styles.input}
            ref={input}
            value={search}
            placeholder=" 🔍  Search for a country..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Dropdown.Header>
        {countryCodes
          .filter((item) =>
            search
              ? Country[item].toLowerCase().indexOf(search.toLowerCase()) !== -1
              : true
          )
          .map((code) => (
            <Dropdown.Item
              key={`dropdown-country-item-${code}`}
              onClick={() => onCountryChange(code)}
              className={styles.item}
            >
              <span>{CountryFlag[code]}</span>
              <span>{Country[code]}</span>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown.Wrapper>
  )
}
