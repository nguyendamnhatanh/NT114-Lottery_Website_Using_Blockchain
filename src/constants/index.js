import { logo, lottery, lucky, payment, profile, dashboard, logout, test } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    path: '/',
  },
  {
    name: 'lottery-room',
    imgUrl: lottery,
    path: '/lottery-room',
    disabled: false,
  },

  {
    name: 'profile',
    imgUrl: profile,
    path: '/profile',
    disabled: false,
  },

  {
    name: 'test-feat',
    imgUrl: test,
    path: '/test-feat',
  },
  // {
  //   name: 'payment',
  //   imgUrl: payment,
  //   path: '/payment',
  //   disabled: false,
  // },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   path: '/',
  //   disabled: false,
  // },
];