export const mediaQuery = (minWidth = 640) => `
  @media (min-width: ${minWidth}px)
`;

export const pxToVw = (size: number) => `
  ${size / 3.75}vw
`;
