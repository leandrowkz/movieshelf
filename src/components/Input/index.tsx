import React, { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large'
}

export function Input({ inputSize = 'medium', className, ...props }: Props) {
  const isMobile = useScreenSize('mobile')
  const classes = classNames(styles.input, className, {
    [styles.mobile]: isMobile,
    [styles.small]: inputSize === 'small',
    [styles.large]: inputSize === 'large',
  })

  return <input className={classes} {...props} />
}
