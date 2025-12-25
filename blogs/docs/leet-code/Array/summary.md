## Array Summary (JavaScript)

### Array Basics

JavaScript arrays are **dynamic arrays** at a high level.

- Indexed, ordered collection  
- Random access by index → **O(1)**  
- Internally optimized by JS engines (e.g. V8):
  - **Dense arrays** → contiguous memory
  - **Sparse arrays** → hash-like structure (slower)

**Implications:**
- Fast access by index
- Expensive insert/remove at the beginning
- `push` / `pop` at the end is efficient (amortized **O(1)**)

---

### Commonly Used Array APIs

| API | Mutates Array | Return Value | Time Complexity | Notes |
|----|----|----|----|----|
| `length` | ❌ | number | O(1) | Read-only |
| `push(x)` | ✅ | new length | O(1)* | Amortized |
| `pop()` | ✅ | element | O(1) | Fast |
| `unshift(x)` | ✅ | new length | O(n) | Shifts elements |
| `shift()` | ✅ | element | O(n) | Avoid if possible |
| `slice(start, end)` | ❌ | new array | O(k) | Copies elements |
| `splice(start, deleteCount, ...items)` | ✅ | removed elements | O(n) | In-place |
| `includes(x)` | ❌ | boolean | O(n) | Linear search |
| `indexOf(x)` | ❌ | index / -1 | O(n) | Linear search |
| `find(fn)` | ❌ | element | O(n) | Stops early |
| `some(fn)` | ❌ | boolean | O(n) | Short-circuit |
| `every(fn)` | ❌ | boolean | O(n) | Short-circuit |
| `map(fn)` | ❌ | new array | O(n) | Creates new array |
| `filter(fn)` | ❌ | new array | O(n) | Creates new array |
| `reduce(fn)` | ❌ | any | O(n) | Accumulator |
| `sort()` | ✅ | array | O(n log n) | Mutates |
| `reverse()` | ✅ | array | O(n) | In-place |
| `concat()` | ❌ | new array | O(n + m) | Copies arrays |
| `join()` | ❌ | string | O(n) | String creation |

> ⚠️ **Interview note**  
> `map / filter / reduce` are readable but use extra memory.  
> Prefer `for` loops in interviews.

---

### Traversal Patterns

#### Index-based loop (recommended)

```js
for (let i = 0; i < arr.length; i++) {
  const val = arr[i];
}
```
- Best for in-place modification
- Fast

#### for...of loop
```js
for (const val of arr) {
}
```
- Cleaner syntax
- Slight overhead

### Common Patterns

#### Binary Search (Array / String)
Used when:
- Data is sorted
- Searching for existence or boundary
```js
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) left = mid + 1;
  else right = mid - 1;
}
```
- Time Complexity: O(log n)

#### Remove Target Value In-place (slow/fast pointers)
```js
          ↓ fast
[1, 2, 3, _, 5, 6]
          ↑ slow

             ↓ fast
[1, 2, 3, _, 5, 6]
          ↑ slow

             ↓ fast
[1, 2, 3, 5, _, 6]
          ↑ slow

                ↓ fast
[1, 2, 3, 5, _, 6]
             ↑ slow

                ↓ fast
[1, 2, 3, 5, 6, _]
             ↑ slow
```
- Order preserved
- O(n) time, O(1) space

#### Squares of a Sorted Array (left/right pointers)
Problem:
- Input array is sorted (non-decreasing)
- May contain negative numbers

Key insight:
- Negative numbers may become larger after squaring
- Largest square must be at either end

Approach:
- Use two pointers (left, right)
- Compare arr[left]^2 and arr[right]^2
- Put the larger value at the end of a new result array
```js
let left = 0, right = n - 1;
let res = new Array(n);
let idx = n - 1;

while (left <= right) {
  if (arr[left] ** 2 > arr[right] ** 2) {
    res[idx--] = arr[left++] ** 2;
  } else {
    res[idx--] = arr[right--] ** 2;
  }
}
```
- Time: O(n)
- Space: O(n)
  
#### Minimum Length Subarray (Sliding Window)
Goal:
- Subarray sum ≥ target
- Find minimum length
  
Sliding window idea:
- Expand window by moving fast
- Shrink window by moving slow when condition is met
```js
// initial place where meet requirement sum (12) >= 8, len = 4
 ↓ left         
[1, 2, 3, 4, 5, 6]
          ↑ right

// move left++, len--, until not meet requirement, then do right++
// sum (9) >= 8? -> true, len = 3
    ↓ left         
[1, 2, 3, 4, 5, 6]
          ↑ right

// sum (7) >= 8? -> false, right++
       ↓ left         
[1, 2, 3, 4, 5, 6]
          ↑ right

// sum (12) >= 8? -> true, len = 3
       ↓ left         
[1, 2, 3, 4, 5, 6]
             ↑ right

// sum (9) >= 8? -> true, len = 2
          ↓ left         
[1, 2, 3, 4, 5, 6]
             ↑ right

// sum (5) >= 8? -> false, right++
             ↓ left         
[1, 2, 3, 4, 5, 6]
             ↑ right

// sum (11) >= 8? -> true, len = 2
             ↓ left         
[1, 2, 3, 4, 5, 6]
                ↑ right

return 2;
```
```js
let sum = 0, left = 0, minLen = Infinity;

for (let right = 0; right < arr.length; right++) {
  sum += arr[right];
  while (sum >= target) {
    minLen = Math.min(minLen, right - left + 1);
    sum -= arr[left++];
  }
}
```
- Time: O(n)
- Space: O(1)
  
#### Prefix Sum 1D
Idea:
- Precompute cumulative sums to answer range queries in O(1).

Used for:
- Multiple range sum queries
- Avoid repeated summation
```js
prefix[i] = arr[0] + ... + arr[i - 1]
sum(l, r) = prefix[r + 1] - prefix[l]
```

#### Prefix Sum 2D
Definition:
- pre[i][j] = sum of rectangle from (0,0) to (i-1, j-1)

Used for:
- Submatrix sum queries
- Grid splitting problems
- Matrix DP optimization
```js
pre[i][j] =
pre[i-1][j]
+ pre[i][j-1]
- pre[i-1][j-1]
+ grid[i-1][j-1]
```

