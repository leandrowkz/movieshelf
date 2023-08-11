import React, { useContext, type HTMLAttributes } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'
import { Text } from '../Text'
import { Motion } from '../Motion'
import { useHelpers } from 'src/hooks/useHelpers'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { MdCake, MdPlace } from 'react-icons/md'
import { PersonLoader } from './loader'
import { PersonImages } from '../PersonImages'
import { PeopleContext } from 'src/context/PeopleContext'

export function PersonDetails(props: HTMLAttributes<HTMLDivElement>) {
  const { person, images, isLoading } = useContext(PeopleContext)
  const { getShowImageUrl, getJobByDepartment, getAgeFromDate, formatDate } =
    useHelpers()
  const isMobile = useScreenSize('mobile')
  const classes = classNames(css.person, props.className, {
    [css.mobile]: isMobile,
  })

  if (isLoading.fetchPerson) {
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
      <PersonImages
        images={images.data}
        className={css.images}
        isLoading={isLoading.fetchImages}
      />
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
