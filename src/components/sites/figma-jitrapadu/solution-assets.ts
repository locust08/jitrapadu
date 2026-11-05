// Image placements follow the supplied Jitra-Padu-29-10-2026 Figma file.
export const clientAsset = (file: string) => `/sites/figma-jitrapadu/client-2026-10-29/${file}.webp`;

export const solutionAssets = {
  "rapid-deployment-system": {
    "hero": "586e7",
    "intro": "8dd3d",
    "main": "3d90c",
    "products": [
      "a2fac",
      "2d778",
      "de170",
      "6e45a",
      "c1f3e",
      "bb2fe"
    ],
    "singleOverlay": "222bf",
    "applications": [
      "3a1f1",
      "f304e",
      "862a7",
      "b5c12",
      "6240b",
      "f4c8e",
      "11e76",
      "6ebd7"
    ],
    "steps": [
      "38685",
      "88807",
      "b84b2",
      "79392",
      "25092",
      "0a76a",
      "e119c",
      "1ee0d",
      "1d376",
      "9fde5"
    ]
  },
  "smart-pole-lamp-pole": {
    "hero": "9ed0d",
    "intro": "0d654",
    "main": "3f80a",
    "products": [
      "b4a88",
      "2a0b9",
      "5fb67",
      "26256",
      "26256",
      "e8e5a",
      "baf16"
    ],
    "applications": [
      "386ca",
      "caf19",
      "37cda",
      "5aa82",
      "582e6",
      "d0b7a",
      "4824f",
      "858b6"
    ],
    "steps": [
      "4d88a",
      "38685",
      "11233",
      "b84b2",
      "671d4",
      "2f0e9",
      "1ae06",
      "e7cd4",
      "36139",
      "9fde5"
    ]
  }
};

export const portfolioBanners: Record<string, string> = {
  all: clientAsset("389f6"),
  "telecom-tower-monopole": clientAsset("389f6"),
  "rapid-deployment-system": clientAsset("05d84"),
  "smart-pole-lamp-pole": clientAsset("b5166"),
};

export const editorialBanners: Record<string, string> = {
  All: clientAsset("11b64"), Article: clientAsset("11b64"),
  News: clientAsset("7e5bc"), Events: clientAsset("21654"), CSR: clientAsset("2b4fd"),
};
