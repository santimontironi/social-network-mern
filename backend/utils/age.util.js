export function calculateAge(birthDay, birthMonth, birthYear) {
    const today = new Date();

    // construimos la fecha de nacimiento (birthMonth - 1 porque los meses en JS van de 0 a 11)
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    // diferencia de años entre hoy y el año de nacimiento
    const age = today.getFullYear() - birthDate.getFullYear();

    // verificamos si el usuario ya cumplió años este año:
    // true si el mes actual es posterior al mes de cumpleaños,
    // o si estamos en el mismo mes pero el día actual es igual o posterior al día de cumpleaños
    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    // si aún no cumplió años este año, la edad real es un año menos
    return hasHadBirthdayThisYear ? age : age - 1;
}
