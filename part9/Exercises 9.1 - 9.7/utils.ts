export const parseArguments = (args: string[]): number[] => {
    const values = args.slice(2).map(value => {
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error('Provided values were not numbers');
        }
        return num;
    });

    return values;
}