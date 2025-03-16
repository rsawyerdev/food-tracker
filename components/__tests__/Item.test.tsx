import { render } from '@testing-library/react-native';
import Item from '../Item';
import React from 'react';

describe('Item', () => {
  it('renders correctly', () => {
    const item = render(
      <Item
        deleteItem={() => {}}
        containerStyle={{}}
        item={{ id: 1, name: 'milk', date: '000' }}
        index={9}
      />
    );
    expect(item.toJSON()).toMatchSnapshot();
    expect(item.findByText('1+1=2'));
  });
});
