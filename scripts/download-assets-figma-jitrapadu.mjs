import { mkdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const assets = [
  {
    "name": "imgProperty1Default",
    "file": "88663.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/88663.png"
  },
  {
    "name": "imgJitrapaduSecondLogo041",
    "file": "d777f.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/d777f.png"
  },
  {
    "name": "imgNavigationMainNavigation",
    "file": "a8339.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/a8339.png"
  },
  {
    "name": "imgFooterWithCta",
    "file": "e7d8f.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/e7d8f.png"
  },
  {
    "name": "imgFooterWithCta1",
    "file": "90da0.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/90da0.png"
  },
  {
    "name": "imgImage236",
    "file": "5607c.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/5607c.png"
  },
  {
    "name": "imgLine4",
    "file": "c87ff.svg",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/c87ff.svg"
  },
  {
    "name": "imgLine1",
    "file": "ce8f2.svg",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/ce8f2.svg"
  },
  {
    "name": "imgProperty1Default1",
    "file": "f0e6b.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/f0e6b.png"
  },
  {
    "name": "imgProperty1Default2",
    "file": "6a0eb.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/6a0eb.png"
  },
  {
    "name": "imgProperty1Default3",
    "file": "f69e9.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/f69e9.png"
  },
  {
    "name": "imgProperty1Default4",
    "file": "20e41.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/20e41.png"
  },
  {
    "name": "imgTower",
    "file": "16e03.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/16e03.png"
  },
  {
    "name": "imgRectangle15",
    "file": "c371c.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/c371c.png"
  },
  {
    "name": "imgRectangle16",
    "file": "6eadb.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/6eadb.png"
  },
  {
    "name": "imgRectangle19",
    "file": "4234d.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/4234d.png"
  },
  {
    "name": "imgRectangle25",
    "file": "9fde5.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/9fde5.png"
  },
  {
    "name": "imgRectangle19",
    "file": "40532.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/40532.png"
  },
  {
    "name": "imgRectangle20",
    "file": "d6f8b.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/d6f8b.png"
  },
  {
    "name": "imgRectangle8",
    "file": "21909.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/21909.png"
  },
  {
    "name": "imgFrame",
    "file": "e24c4.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/e24c4.png"
  },
  {
    "name": "imgFrame1",
    "file": "ce86a.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/ce86a.png"
  },
  {
    "name": "imgFrame2",
    "file": "63599.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/63599.png"
  },
  {
    "name": "imgFrame3",
    "file": "1fe6f.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/1fe6f.png"
  },
  {
    "name": "imgFrame4",
    "file": "89429.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/89429.png"
  },
  {
    "name": "imgFrame5",
    "file": "51338.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/51338.png"
  },
  {
    "name": "imgTelekomMalaysia",
    "file": "3c79e.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/3c79e.png"
  },
  {
    "name": "imgDcaMalaysia",
    "file": "0f995.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/0f995.png"
  },
  {
    "name": "imgMcmc",
    "file": "1d955.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/1d955.png"
  },
  {
    "name": "imgDHarmonyTelcoInfraSdnBhd",
    "file": "1fcbb.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/1fcbb.png"
  },
  {
    "name": "imgDigitalNasional",
    "file": "aad0a.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/aad0a.png"
  },
  {
    "name": "imgCelcomDigi",
    "file": "86de1.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/86de1.png"
  },
  {
    "name": "imgCivilAviationAuthorityOfMalaysia",
    "file": "32b20.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/32b20.png"
  },
  {
    "name": "imgMaxis",
    "file": "54cf0.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/54cf0.png"
  },
  {
    "name": "imgMajlisKeselamatanNegara",
    "file": "2afdb.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/2afdb.png"
  },
  {
    "name": "imgUmobile",
    "file": "86ea9.png",
    "url": "https://www.figma.com/api/mcp/asset/93407d53-cc6e-4729-af0b-a816d0ed4626/86ea9.png"
  },
  {
    "name": "imgRectangle8",
    "file": "687ab.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/687ab.png"
  },
  {
    "name": "imgRectangle15",
    "file": "d3b69.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/d3b69.png"
  },
  {
    "name": "imgRectangle7",
    "file": "bc58c.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/bc58c.png"
  },
  {
    "name": "imgRectangle1",
    "file": "4ac91.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/4ac91.png"
  },
  {
    "name": "imgRectangle2",
    "file": "e7432.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/e7432.png"
  },
  {
    "name": "imgRectangle3",
    "file": "270ae.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/270ae.png"
  },
  {
    "name": "imgRectangle12",
    "file": "46788.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/46788.png"
  },
  {
    "name": "imgRectangle13",
    "file": "bfe35.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/bfe35.png"
  },
  {
    "name": "imgRectangle9",
    "file": "857fe.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/857fe.png"
  },
  {
    "name": "imgRectangle10",
    "file": "cbcd2.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/cbcd2.png"
  },
  {
    "name": "imgRectangle11",
    "file": "0b993.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/0b993.png"
  },
  {
    "name": "imgRectangle14",
    "file": "f7ddc.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/f7ddc.png"
  },
  {
    "name": "imgRectangle16",
    "file": "b23c8.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/b23c8.png"
  },
  {
    "name": "imgImage238",
    "file": "55b91.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/55b91.png"
  },
  {
    "name": "imgRectangle17",
    "file": "1d7d6.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/1d7d6.png"
  },
  {
    "name": "imgRectangle18",
    "file": "32e5c.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/32e5c.png"
  },
  {
    "name": "imgRectangle19",
    "file": "1393b.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/1393b.png"
  },
  {
    "name": "imgRectangle20",
    "file": "031f5.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/031f5.png"
  },
  {
    "name": "imgRectangle21",
    "file": "1c3f8.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/1c3f8.png"
  },
  {
    "name": "imgRectangle22",
    "file": "bdb93.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/bdb93.png"
  },
  {
    "name": "imgRectangle23",
    "file": "9c60b.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/9c60b.png"
  },
  {
    "name": "imgRectangle24",
    "file": "71610.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/71610.png"
  },
  {
    "name": "imgRectangle25",
    "file": "d6026.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/d6026.png"
  },
  {
    "name": "imgRectangle26",
    "file": "76a50.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/76a50.png"
  },
  {
    "name": "imgRectangle27",
    "file": "bdc44.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/bdc44.png"
  },
  {
    "name": "imgRectangle28",
    "file": "b0451.png",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/b0451.png"
  },
  {
    "name": "imgRectangle18",
    "file": "bad8d.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/bad8d.png"
  },
  {
    "name": "imgRectangle22",
    "file": "2ba06.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/2ba06.png"
  },
  {
    "name": "imgRectangle8",
    "file": "d6c79.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/d6c79.png"
  },
  {
    "name": "imgLine15",
    "file": "ba425.svg",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/ba425.svg"
  },
  {
    "name": "imgGroup15",
    "file": "fe9be.svg",
    "url": "https://www.figma.com/api/mcp/asset/2353fdf1-2a3c-4dd2-a75a-7621e82b5d5a/fe9be.svg"
  },
  {
    "name": "imgRectangle1",
    "file": "fa8df.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/fa8df.png"
  },
  {
    "name": "imgRectangle2",
    "file": "8562d.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/8562d.png"
  },
  {
    "name": "imgRectangle9",
    "file": "547d3.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/547d3.png"
  },
  {
    "name": "imgRectangle10",
    "file": "95ce6.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/95ce6.png"
  },
  {
    "name": "imgBackground",
    "file": "273ae.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/273ae.png"
  },
  {
    "name": "imgRectangle19",
    "file": "abcbb.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/abcbb.png"
  },
  {
    "name": "imgRectangle20",
    "file": "41119.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/41119.png"
  },
  {
    "name": "imgRectangle21",
    "file": "97b49.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/97b49.png"
  },
  {
    "name": "imgRectangle23",
    "file": "e2266.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/e2266.png"
  },
  {
    "name": "imgRectangle15",
    "file": "335fe.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/335fe.png"
  },
  {
    "name": "imgRectangle16",
    "file": "4f3ed.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/4f3ed.png"
  },
  {
    "name": "imgRectangle17",
    "file": "82388.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/82388.png"
  },
  {
    "name": "imgRectangle24",
    "file": "b8da7.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/b8da7.png"
  },
  {
    "name": "imgRectangle21",
    "file": "0a76a.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/0a76a.png"
  },
  {
    "name": "imgRectangle26",
    "file": "34802.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/34802.png"
  },
  {
    "name": "imgRectangle23",
    "file": "60a46.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/60a46.png"
  },
  {
    "name": "imgRectangle28",
    "file": "c51ef.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/c51ef.png"
  },
  {
    "name": "imgRectangle30",
    "file": "70dab.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/70dab.png"
  },
  {
    "name": "imgRectangle31",
    "file": "47c48.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/47c48.png"
  },
  {
    "name": "imgRectangle32",
    "file": "3c3e1.png",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/3c3e1.png"
  },
  {
    "name": "imgLine16",
    "file": "b00b7.svg",
    "url": "https://www.figma.com/api/mcp/asset/8a49d7a8-2e79-4808-b11e-495545e678f8/b00b7.svg"
  },
  {
    "name": "imgRectangle2",
    "file": "73b9c.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/73b9c.png"
  },
  {
    "name": "imgRectangle13",
    "file": "9c687.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/9c687.png"
  },
  {
    "name": "imgRectangle12",
    "file": "4a624.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/4a624.png"
  },
  {
    "name": "imgRectangle8",
    "file": "acfba.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/acfba.png"
  },
  {
    "name": "imgRectangle9",
    "file": "abfaf.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/abfaf.png"
  },
  {
    "name": "imgRectangle10",
    "file": "0cb46.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/0cb46.png"
  },
  {
    "name": "imgRectangle11",
    "file": "3acd4.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/3acd4.png"
  },
  {
    "name": "imgRectangle14",
    "file": "2c6e1.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/2c6e1.png"
  },
  {
    "name": "imgRectangle15",
    "file": "3feec.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/3feec.png"
  },
  {
    "name": "imgFrame",
    "file": "dd177.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/dd177.png"
  },
  {
    "name": "imgFrame1",
    "file": "071f5.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/071f5.png"
  },
  {
    "name": "imgFrame2",
    "file": "107b7.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/107b7.png"
  },
  {
    "name": "imgFrame3",
    "file": "97607.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/97607.png"
  },
  {
    "name": "imgFrame4",
    "file": "49871.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/49871.png"
  },
  {
    "name": "imgFrame5",
    "file": "cbc14.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/cbc14.png"
  },
  {
    "name": "imgFrame6",
    "file": "a07fa.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/a07fa.png"
  },
  {
    "name": "imgRectangle16",
    "file": "7aa7e.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/7aa7e.png"
  },
  {
    "name": "imgRectangle17",
    "file": "38685.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/38685.png"
  },
  {
    "name": "imgRectangle18",
    "file": "b84b2.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/b84b2.png"
  },
  {
    "name": "imgRectangle20",
    "file": "2f0e9.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/2f0e9.png"
  },
  {
    "name": "imgRectangle22",
    "file": "88807.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/88807.png"
  },
  {
    "name": "imgRectangle24",
    "file": "36139.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/36139.png"
  },
  {
    "name": "imgRectangle26",
    "file": "7c4f4.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/7c4f4.png"
  },
  {
    "name": "imgRectangle27",
    "file": "0bbc3.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/0bbc3.png"
  },
  {
    "name": "imgRectangle28",
    "file": "42ef4.png",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/42ef4.png"
  },
  {
    "name": "imgLine16",
    "file": "15f15.svg",
    "url": "https://www.figma.com/api/mcp/asset/28bab61d-4171-4d4a-be97-cf4730ca9539/15f15.svg"
  }
];
const root = 'public/sites/figma-jitrapadu/shared';
await mkdir(root,{recursive:true});
for(let i=0;i<assets.length;i+=4) {
 await Promise.all(assets.slice(i,i+4).map(async a=>{
  const dest=root+'/'+a.file;
  try { if((await stat(dest)).size>0) return; } catch {}
  execFileSync('curl.exe',['-f','-L','--retry','2','--max-time','90',a.url,'-o',dest],{stdio:'pipe'});
  if(!(await stat(dest)).size) throw Error('Empty '+a.file);
 }));
 console.log(Math.min(i+4,assets.length)+'/'+assets.length);
}

