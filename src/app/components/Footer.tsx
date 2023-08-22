export default function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <div className='flex h-10 justify-center border-t sm:w-full'>
      <p> Nemanja Kostovski, All Rights Reserved &copy; {year} </p>
    </div>
  );
}
