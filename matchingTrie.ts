import type { TrieNode } from "./two.ts";
export const matchers: TrieNode[] = [
  {
    char: "o",
    children: [
      {
        char: "n",
        children: [
          {
            char: "e",
            children: [],
            value: 1,
          },
        ],
      },
    ],
  },
  {
    char: "t",
    children: [
      {
        char: "w",
        children: [
          {
            char: "o",
            children: [],
            value: 2,
          },
        ],
      },
      {
        char: "h",
        children: [
          {
            char: "r",
            children: [
              {
                char: "e",
                children: [
                  {
                    char: "e",
                    children: [],
                    value: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    char: "f",
    children: [
      {
        char: "o",
        children: [
          {
            char: "u",
            children: [
              {
                char: "r",
                children: [],
                value: 4,
              },
            ],
          },
        ],
      },
      {
        char: "i",
        children: [
          {
            char: "v",
            children: [
              {
                char: "e",
                children: [],
                value: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    char: "s",
    children: [
      {
        char: "i",
        children: [
          {
            char: "x",
            children: [],
            value: 6,
          },
        ],
      },
      {
        char: "e",
        children: [
          {
            char: "v",
            children: [
              {
                char: "e",
                children: [
                  {
                    char: "n",
                    children: [],
                    value: 7,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    char: "e",
    children: [
      {
        char: "i",
        children: [
          {
            char: "g",
            children: [
              {
                char: "h",
                children: [
                  {
                    char: "t",
                    children: [],
                    value: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    char: "n",
    children: [
      {
        char: "i",
        children: [
          {
            char: "n",
            children: [{ char: "e", children: [], value: 9 }],
          },
        ],
      },
    ],
  },
  {
    char: "1",
    children: [],
    value: 1,
  },
  {
    char: "2",
    children: [],
    value: 2,
  },
  {
    char: "3",
    children: [],
    value: 3,
  },
  {
    char: "4",
    children: [],
    value: 4,
  },
  {
    char: "5",
    children: [],
    value: 5,
  },
  {
    char: "6",
    children: [],
    value: 6,
  },
  {
    char: "7",
    children: [],
    value: 7,
  },
  {
    char: "8",
    children: [],
    value: 8,
  },
  {
    char: "9",
    children: [],
    value: 9,
  },
];
