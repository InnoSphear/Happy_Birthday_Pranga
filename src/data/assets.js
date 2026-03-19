const mediaImports = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,mp4}', { eager: true });

// Filter out duplicate files created by Windows (e.g., ' - Copy')
const allMediaEntries = Object.entries(mediaImports);
const uniqueMedia = allMediaEntries
    .filter(([path]) => !path.toLowerCase().includes(' - copy'))
    .map(([, mod]) => mod.default);

export const allMedia = uniqueMedia;

export const audios = {
    happy: "/Happy Birthday, pranga.mp3",
    emotional: "/emotional.mp3"
};

// The user wants EVERY image to be used heavily. So we simply supply the full array to both endpoints, 
// ensuring absolute completion. (We could shuffle them if desired, but this guarantees 100% visibility)
export const galleryMedia = allMedia;
export const myLoveMedia = allMedia;

export const quotes = [
    "I want to be in your life forever, Pranga. Every second counts.",
    "Happy Birthday Pranga. If I could gift you one thing, it would be the way I see you.",
    "Every memory of us is a golden treasure I hold deeply.",
    "Sometimes the best parts of my day are just thinking of you.",
    "You are my beautiful distraction, Pranga. I miss you more than words can say.",
    "No matter the distance, my soul always whispers your name.",
    "I wish the clock could rewind so I'd never have to let you go, my love.",
    "Our moments are permanently carved into my soul.",
    "Life feels incomplete without your laugh. You are irreplaceable.",
    "I still look for your face in every crowd.",
    "There is a space in my heart shaped exactly like you.",
    "You are the poem I never knew how to write.",
    "Even in the silence, my heart beats for you.",
    "Pranga, the impact you made on my life is eternally beautiful.",
    "A thousand words couldn't bring you back, but my heart still hopes they will.",
    "You left footprints on my heart that time can never wash away.",
    "I am holding onto the beautiful chapters we wrote together.",
    "No sunset will ever compare to the light you brought into my life.",
    "Your name is my favorite prayer.",
    "You are the calm in my chaos and the spark in my quiet.",
    "Some hearts meet and remember each other forever. Ours did.",
    "I carry you in every small thing that makes me smile.",
    "You are my once in a lifetime in every lifetime.",
    "If love had a face, it would look like your smile.",
    "Every path I take leads me back to you.",
    "I fell for your soul before I knew its name.",
    "You are the warm light on all my cold days.",
    "I still keep your laughter like a song in my pocket.",
    "My favorite place is anywhere beside you.",
    "You are the softest memory and the strongest hope.",
    "I love you in the quiet, and I love you in the storm.",
    "The world feels softer when I remember you.",
    "You are the miracle my heart keeps whispering about.",
    "In a thousand crowds, I'd find you.",
    "My love for you is a tide that never stops coming home.",
    "You are the reason I believe in forever.",
    "No distance can untie what our hearts have tied.",
    "You are my sweetest habit and my happiest mistake.",
    "I keep a seat for you in every dream.",
    "You made ordinary days feel like celebrations.",
    "Your voice is the safest place I know.",
    "If I could pause time, I'd choose the moments with you.",
    "You are the glow that makes everything else shine.",
    "Your memory is the crown I wear on my quiet days.",
    "I found my home in your heart.",
    "You are my favorite story and my forever chapter.",
    "Your presence is a luxury my soul still craves.",
    "I carry your name like a lucky charm.",
    "Your love turned my shadows into gold.",
    "Some people feel like music. You are my melody.",
    "My heart still dances to your rhythm.",
    "You are the reason my wishes sound like your name.",
    "Every heartbeat is a reminder of you.",
    "I loved you yesterday, I love you still, I always will.",
    "You are the light behind my closed eyes.",
    "The universe knows my favorite star, and it's you.",
    "My love for you is timeless, fearless, and true.",
    "I would choose you in every story, every time.",
    "Your smile is my favorite sunrise.",
    "If devotion had a shape, it would be your silhouette.",
    "Even miles away, my heart sits beside you.",
    "You are my most precious wish."
];
