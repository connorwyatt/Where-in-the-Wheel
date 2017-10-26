import { RandomAccessIterator } from './randomAccessIterator';

const arrayFromIterator = (iterator: Generator) =>
{
  let result = iterator.next();
  const array = [];

  while (!result.done)
  {
    array.push(result.value);

    result = iterator.next();
  }

  return array;
};

describe('RandomAccessIterator', () =>
{
  let iterator: Generator;
  const names = [
    'Sheldon',
    'Leonard',
    'Howard',
    'Raj',
    'Penny',
    'Amy',
    'Bernadette'
  ];

  beforeEach(() =>
  {
    iterator = RandomAccessIterator(names);
  });

  it('returns the same number of elements that it was provided with', () =>
  {
    const elements = arrayFromIterator(iterator);

    expect(elements.length).toBe(names.length);
  });

  it('returns all elements from the provided elements', () =>
  {
    const elements = arrayFromIterator(iterator);

    names.forEach(name =>
    {
      expect(elements).toContain(name);
    });
  });

  it('returns the elements in a different order each time', () =>
  {
    const results = Array(10)
      .fill(null, 0, 10)
      .map(() => arrayFromIterator(RandomAccessIterator(names)))
      .map(elements =>
      {
        return elements.join(', ');
      });

    const uniqueFirstValues = results.filter((value, index) =>
    {
      return index === results.indexOf(value);
    });

    expect(uniqueFirstValues.length).toBeGreaterThan(1);
  });
});