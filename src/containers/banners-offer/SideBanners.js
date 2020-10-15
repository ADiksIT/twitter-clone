import React from 'react'
import { Banner } from '../../components/BannerContainer/Banner'
import { ThemeBanner } from '../../components/ThemeBanner/ThemeBanner'
import { FollowBanner } from '../../components/FollowBanner/FollowBanner'
import { CustomizedInputBase } from './Input'

//todo: remove fake data for visibly content
const data = {
  actual: 'Ukraine',
  theme: 'DOKA 2',
  popularity: 'Armenia',
  counter: '3 312',
}

const data1 = {
  actual: 'Украина',
  theme: 'ЧМ-2020',
}

const data2 = {
  actual: 'Олуг Дудник',
  theme: 'Петров иванов',
  popularity: 'Armenia',
}

export const SideBanners = () => {
  return (
    <div className="banners" style={{ marginLeft: 20 }}>
      <CustomizedInputBase />
      <Banner title="Actual for you" headerButton>
        <ThemeBanner {...data1} />
        <ThemeBanner {...data} />
        <ThemeBanner {...data2} />
      </Banner>

      <Banner title="Who to follow">
        <FollowBanner avatar="" name="Национальный Парк" tag="@national_park" />
        <FollowBanner avatar="" name="Фанаты GreenLOha" tag="@greenLohFans" />
        <FollowBanner avatar="" name="Офники 2020" tag="@offnik-ukraine" />
      </Banner>
    </div>
  )
}
