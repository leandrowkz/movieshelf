import React, { type HTMLAttributes } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'
import { Text } from '../Text'
import { Motion } from '../Motion'
import type { Image, Person } from '@leandrowkz/tmdb'
import { useHelpers } from 'src/hooks/useHelpers'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { MdCake, MdPlace } from 'react-icons/md'
import { PersonLoader } from './loader'
import { PersonImages } from '../PersonImages'

interface PersonDetailsProps extends HTMLAttributes<HTMLDivElement> {
  person: Person
  images?: Image[]
  isLoading?: boolean
}

export function PersonDetails({
  person,
  images = [],
  isLoading = false,
  ...props
}: PersonDetailsProps) {
  const { getShowImageUrl, getJobByDepartment, getAgeFromDate, formatDate } =
    useHelpers()
  const isMobile = useScreenSize('mobile')
  const classes = classNames(css.person, props.className, {
    [css.mobile]: isMobile,
  })

  if (isLoading) {
    return <PersonLoader data-testid="person-loader" />
  }

  const {
    birthday,
    place_of_birth,
    name,
    profile_path,
    known_for_department,
    gender,
  } = person
  const knownFor = getJobByDepartment(known_for_department, gender)
  const avatar = getShowImageUrl(profile_path || '', 200)

  return (
    <Motion tag="div" className={classes} {...props}>
      <Avatar image={avatar} width="200px" className={css.avatar} />
      <PersonImages images={images} className={css.images} />
      <Heading title={name} level={1} className={css.name} />
      <Heading title={knownFor} level={2} className={css.knownFor} />
      <Text className={css.birthplace}>
        <MdPlace color="teal" />
        <span>{place_of_birth || '-'}</span>
      </Text>
      <Text className={css.age}>
        <MdCake color="hotpink" />
        {birthday ? (
          <>
            <span>{formatDate(birthday)}</span>
            <Text isMuted>{`(${getAgeFromDate(birthday)} years)`}</Text>
          </>
        ) : (
          '-'
        )}
      </Text>
      <Text className={css.bio}>{person.biography}</Text>
    </Motion>
  )
}
