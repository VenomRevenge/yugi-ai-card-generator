type PersonProps = {
  name: string;
  age: number;
  country: string;
}

export const Person = ({ name, age, country }: PersonProps) => {
return (
  <div>
    <h1>
    {name}
    </h1>
    <div>
      {age}
      {country}
    </div>
  </div>
)
}