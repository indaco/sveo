<script lang="ts">
	import type { WebSite, WithContext, PostalAddress, Person, Organization } from 'schema-dts';
	import type { SEOWebSite } from '../../../types.js';
	import { serializeJSONLdSchema, isSEOPerson } from '../../../utils.js';

	interface Props {
		data: SEOWebSite;
	}

	let { data }: Props = $props();

	const schemaOrgWebSite: WithContext<WebSite> = $state({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${data.baseURL}/#website`,
		name: data.name,
		url: data.baseURL,
		description: data.description || '',
		keywords: data.keywords || [],
		inLanguage: data.language || '',
		license: data.copyright || ''
	});

	if (data.socials !== undefined) {
		const sameAs = Object.values(data.socials).filter((v) => v !== '');
		if (sameAs.length > 0) {
			schemaOrgWebSite.sameAs = sameAs;
		}
	}

	if (data.creator) {
		let _address: string | PostalAddress;

		if (typeof data.creator.address === 'string') {
			_address = data.creator.address;
		} else {
			_address = {
				'@type': 'PostalAddress',
				addressLocality: data.creator.address?.city,
				postalCode: data.creator.address?.postalCode,
				streetAddress: data.creator.address?.streetAddress
			};
		}

		let _creator: Person | Organization = {
			'@type': isSEOPerson(data.creator) ? 'Person' : 'Organization',
			name: data.creator.name,
			email: data.creator.email,
			url: data.creator.url,
			telephone: data.creator.telephone,
			address: _address
		};

		if (isSEOPerson(data.creator)) {
			(_creator as Extract<Person, { '@type': 'Person' }>).jobTitle = data.creator.jobTitle;
		}

		schemaOrgWebSite.creator = _creator;
	}
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgWebSite, 'jsonld-website')}
</svelte:head>
