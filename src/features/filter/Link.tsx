import React from 'react'

interface LinkProps {
  active: boolean;
  children: React.ReactNode;
  setVisibilityFilter: (filter: string) => void;
  filter: string;
}

const Link = ({ active, children, setVisibilityFilter, filter }: LinkProps) => (
  <button
    onClick={() => setVisibilityFilter(filter)}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
)

export default Link