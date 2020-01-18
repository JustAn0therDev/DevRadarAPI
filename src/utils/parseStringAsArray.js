export default function parseStringAsArray(string, parsingOption) {
    if (string)
        return string.split(parsingOption).map((item) => item.trim());
}