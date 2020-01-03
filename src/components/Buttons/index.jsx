import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons'
import styles from './Buttons.module.css'
import {fireTrackingEvent} from '../../utils/tracking'

const Btn = ({
               handleOnClick,
               handleOnHover,
               disabled,
               Icon,
               loading,
               classes,
               text,
               name,
               type,
               trackingId,
               cyId
}) => {
    const [isHoverState, setIsHoverState] = useState(false)

    const onClickHandler = () => {
        handleOnClick()
        fireTrackingEvent(`btn_click;${trackingId}`)
    }
    const onMouseEnterHandler = () => setIsHoverState(true)
    const onMouseLeaveHandler = () => setIsHoverState(false)

    useEffect(() => {
        if(isHoverState) {
            handleOnHover()
            fireTrackingEvent(`btn_hover;${trackingId}`)
        }
    }, [isHoverState, handleOnHover, trackingId])

    return (
        <button
          onClick={onClickHandler}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          disabled={disabled}
          className={classes}
          name={name}
          type={type}
          data-cy={cyId}
        >
            {loading && <FontAwesomeIcon icon={faSpinner} pull={text && "right"} spin pulse/>}
            {!loading && Icon && Icon}
            {text && <span className={styles.text}>{text}</span>}
        </button>
    )
}

const CircularBtnPrimarySmallArrow = props => (
    <Btn
        classes={`
            ${styles.btn}
            ${styles.primary}
            ${styles.circular}
            ${styles.small}
        `}
        Icon={<FontAwesomeIcon icon={faCoffee} />}
        {...props}
    />
)

const RectangularBtnPrimarySmallArrow = props => (
    <Btn
        classes={`
            ${styles.btn}
            ${styles.primary}
            ${styles.rectangular}
            ${styles.small}
        `}
        Icon={<FontAwesomeIcon icon={faCoffee} />}
        {...props}
    />
)

const RectangularBtnPrimaryMediumArrow = props => (
  <Btn
    classes={`
            ${styles.btn}
            ${styles.primary}
            ${styles.rectangular}
            ${styles.medium}
        `}
    Icon={<FontAwesomeIcon icon={faCoffee} pull="right"/>}
    {...props}
  />
)

const RectangularBtnPrimaryLargeArrow = props => (
  <Btn
    classes={`
            ${styles.btn}
            ${styles.primary}
            ${styles.rectangular}
            ${styles.large}
        `}
    Icon={<FontAwesomeIcon icon={faCoffee} pull="right"/>}
    {...props}
  />
)

const RectangularBtnSecondarySmallArrow = props => (
    <Btn
        classes={`
            ${styles.btn}
            ${styles.secondary}
            ${styles.rectangular}
            ${styles.small}
        `}
        Icon={<FontAwesomeIcon icon={faCoffee} pull="right"/>}
        {...props}
    />
)

const RectangularBtnSecondaryMediumArrow = props => (
  <Btn
    classes={`
            ${styles.btn}
            ${styles.primary}
            ${styles.rectangular}
            ${styles.medium}
        `}
    Icon={<FontAwesomeIcon icon={faCoffee} pull="right"/>}
    {...props}
  />
)

const RectangularBtnSecondaryLargeArrow = props => (
  <Btn
    classes={`
            ${styles.btn}
            ${styles.secondary}
            ${styles.rectangular}
            ${styles.large}
        `}
    Icon={<FontAwesomeIcon icon={faCoffee} pull="right"/>}
    {...props}
  />
)

Btn.defaultProps = {
    handleOnClick: e => console.log({ e }),
    handleOnHover: e => console.log({ e }),
    text: null,
    classes: null,
    name: 'default_name',
    disabled: false,
    type: 'button',
    Icon: null,
    loading: false,
    trackingId: 'trackingId is not assigned',
    cyId: 'cyId is not assigned'
}

export {
    RectangularBtnPrimarySmallArrow,
    RectangularBtnPrimaryMediumArrow,
    RectangularBtnPrimaryLargeArrow,
    RectangularBtnSecondarySmallArrow,
    RectangularBtnSecondaryMediumArrow,
    RectangularBtnSecondaryLargeArrow,
    CircularBtnPrimarySmallArrow,
}