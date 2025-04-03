export function getMeta(metaName: string) {
	const metas = document.getElementsByTagName('meta');
	for (let i = 0; i < metas.length; i += 1) {
		if (
			metas[i].getAttribute('name') === metaName ||
			metas[i].getAttribute('itemprop') === metaName ||
			metas[i].getAttribute('property') === metaName
		) {
			return metas[i].getAttribute('content');
		}
	}
	return '';
}

export function getMetaAll(name: string): string[] {
	const metas = document.getElementsByTagName('meta');
	const results: string[] = [];

	for (let i = 0; i < metas.length; i++) {
		if (
			metas[i].getAttribute('name') === name ||
			metas[i].getAttribute('property') === name ||
			metas[i].getAttribute('itemprop') === name
		) {
			const content = metas[i].getAttribute('content');
			if (content) results.push(content);
		}
	}

	return results;
}
