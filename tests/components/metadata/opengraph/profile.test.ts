import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import {
	EnumOpenGraphProfileGender,
	OpenGraphType,
	type SEOWebPage
} from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

// Base reusable object
const baseProfileData: SEOWebPage = {
	url: 'https://example.com/profile/john-doe',
	title: 'John Doe Profile',
	opengraph: {
		type: OpenGraphType.Profile,
		profile: {
			url: 'https://example.com/profile',
			first_name: 'John',
			last_name: 'Doe',
			username: 'johndoe123',
			gender: EnumOpenGraphProfileGender.NonBinary
		}
	}
};

describe('OpenGraph - Profile', () => {
	it('renders all profile meta tags when present', () => {
		render(OpenGraph, { props: { data: baseProfileData } });

		expect(getMeta('profile:first_name')).toBe('John');
		expect(getMeta('profile:last_name')).toBe('Doe');
		expect(getMeta('profile:username')).toBe('johndoe123');
		expect(getMeta('profile:gender')).toBe(EnumOpenGraphProfileGender.NonBinary);
	});

	it('omits meta tags when profile fields are missing', () => {
		const data: SEOWebPage = {
			...baseProfileData,
			opengraph: {
				type: OpenGraphType.Profile,
				profile: {
					url: 'https://example.com/profile',
					first_name: undefined,
					last_name: '',
					username: undefined,
					gender: undefined
				}
			}
		};

		render(OpenGraph, { props: { data } });

		expect(getMeta('profile:first_name')).toBe('');
		expect(getMeta('profile:last_name')).toBe('');
		expect(getMeta('profile:username')).toBe('');
		expect(getMeta('profile:gender')).toBe('');
	});
});
