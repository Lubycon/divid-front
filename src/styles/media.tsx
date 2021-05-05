export const mediaQuery = (minWidth = 640) => `
  @media (min-width: ${minWidth}px)
`;

export const calcSize = (size: number) => `
  ${size / 3.75}vw
`;
