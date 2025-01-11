export const formatCurrency = (value: number = 0) => {
    const suffixes = ["", "K", "M", "B", "T"];
    const tiers = Math.floor(Math.log10(Math.abs(value)) / 3);
    const scaledValue = value / Math.pow(10, tiers * 3);
    const roundedValue = scaledValue.toFixed(2);

    const formattedValue = `$${parseFloat(roundedValue)}${suffixes[tiers]}`;

    return formattedValue;
};

export const formatLanguage = (langCode: string = ""): string => {
    try {
        const language = new Intl.DisplayNames(["en"], { type: "language" });
        return language.of(langCode) || langCode;
    } catch {
        return langCode;
    }
};

export const formatMinutes = (minutes: number | null = 0) => {
    if (!minutes) {
        minutes = 0;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours.toString().padStart(2, "0")}h ${remainingMinutes.toString().padStart(2, "0")}m`;
};
