export interface StatItem {
    id: string;
    value: string;
    label: string;
}

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    imagePosition: 'left' | 'right';
    illustration: 'paperToApp' | 'dashboard';
}