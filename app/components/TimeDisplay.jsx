export default function TimeDisplay({ seconds }) {
    // Ensure input is a number
    const totalSeconds = Number(seconds) || 0;

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    // Format with leading zeros
    const formatted = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return <span className="font-semibold">{formatted}</span>;
};