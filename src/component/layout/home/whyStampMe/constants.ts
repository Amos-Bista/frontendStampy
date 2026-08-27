import React from 'react';
import type { TopFeature, WhyCardItem } from './types';

export const TOP_FEATURES: readonly TopFeature[] = [
    {
        id: 'simple-to-use',
        title: 'Simple to use',
        description: "It's just like a loyalty card, but managed digitally through our loyalty card app.",
        iconType: 'phone',
    },
    {
        id: 'easy-to-set-up',
        title: 'Easy to set up',
        description: 'No complicated POS integrations, software or hardware required.',
        iconType: 'gears',
    },
    {
        id: 'try-it-free',
        title: 'Try it free!',
        description: 'If a digital card is not for you, cancel your trial and pay nothing!',
        iconType: 'circle',
    },
] as const;

export const WHY_CARDS: readonly (WhyCardItem & { description: React.ReactNode })[] = [
    {
        id: 'customer-data',
        title: 'Customer Data',
        description: React.createElement(
            React.Fragment,
            null,
            'Full access to your ',
            React.createElement('strong', null, 'customer data'),
            ', including names, email addresses and phone numbers (if provided).',
        ),
        iconType: 'customerData',
    },
    {
        id: 'marketing',
        title: 'Marketing',
        description: React.createElement(
            React.Fragment,
            null,
            'Communicate directly with your customers through ',
            React.createElement('strong', null, 'Push Notifications'),
            ' or ',
            React.createElement('strong', null, 'SMS'),
            '.',
        ),
        iconType: 'marketing',
    },
    {
        id: 'gamification',
        title: 'Gamification',
        description: React.createElement(
            React.Fragment,
            null,
            'Build hype around your loyalty program and get customers with ',
            React.createElement('strong', null, 'Scratch & Win '),
            'games.',
        ),
        iconType: 'gamification',
    },
    {
        id: 'integrations',
        title: 'Integrations',
        description: React.createElement(
            React.Fragment,
            null,
            'Integrate your ',
            React.createElement('strong', null, 'loyalty program'),
            ' with email or CRM platforms, including Mailchimp.',
        ),
        iconType: 'integrations',
    },
] as const;