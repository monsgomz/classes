# Grade

HTML Code Quality: 1/1
CSS Code Quality: 1.75/2
Design Matching: 1/1
File Organization & Commits: 1/1
Total: 4.75/5

## Comments
Overall, this is looking and functioning great. A couple of picky comments to really make it great:
- You should set `accent-color: var(--color-accent);` on the `:root` so that it applies in every instance you need it. Currently your checkbox isn't getting it because it is not inside of a `.form-unit`