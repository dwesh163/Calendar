import styles from '@/styles/week.module.css';

export default function Week({ weekData }) {
	const daysOfWeek = Object.keys(weekData);

	const timeRow = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<div className={styles['week-box']} data-id="1:415">
			<div className={styles['week-days']} data-id="1:416">
				<div className={styles['days-rows']} data-id="1:417">
					{daysOfWeek.map((day) => (
						<article key={day} className={`${styles['day-title']} ${new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday' || new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? 'day-weekend' : ''} ${new Date(day).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') ? 'day-today' : ''}`} style={{ boxShadow: new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
							<div className={`${styles['days-names']} ${styles['days-names']} ${styles['days-names']}  inter-bold-sonic-silver-10px`}>{new Date(day).toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3).toUpperCase()}</div>
							<div className="x21 valign-text-middle inter-medium-black-22px" data-id="1:420">
								{new Date(day).toLocaleDateString('en-US', { day: '2-digit' })}
							</div>
						</article>
					))}
				</div>
				<div className="est-gmt-5-muPwlo valign-text-middle text-xsmedium" data-id="1:427">
					EST
					<br />
					GMT-5
				</div>
			</div>
			{timeRow.map((time, index) => (
				<div key={index} className={styles['hour-row']} data-id="1:428">
					<div className="time-BdLsfm valign-text-middle time text-xsmedium" data-id="1:429">
						{time} AM
					</div>
					<div className="blocks">
						{daysOfWeek.map((day) => (
							<div key={index} className={`x60-block-q3cJtl x60-block  ${new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday' || new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? 'x60-block-weekend' : ''} ${new Date(day).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') ? 'x60-block-today' : ''}`} data-id="1:2306">
								<div className="x30-block-C61Ns6 x30-block" data-id="1:2307"></div>
								<div className="x30-block-oe0AIH x30-block" data-id="1:2308"></div>
							</div>
						))}
					</div>
					<div className="time-XwphFF valign-text-middle time text-xsmedium" data-id="1:438">
						{time} AM
					</div>
				</div>
			))}
			{/* <div className="hour-row-dU2W8Y hour-row" data-id="1:2242">
				<div className="time-pvmMZm valign-text-middle time text-xsmedium" data-id="1:2243">
					8 AM
				</div>
				<div className="blocks" data-id="1:2244">
					<div className="x60-block-vSDys4 x60-block" data-id="1:2267">
						<div className="x30-block-nIjhH7 x30-block" data-id="1:2268"></div>
						<div className="x30-block-90WdoZ x30-block" data-id="1:2269"></div>
					</div>
					<div className="x60-block-nqch1X x60-block" data-id="1:2270">
						<div className="x30-block-YtVxFC x30-block" data-id="1:2271"></div>
						<div className="x30-block-UUPBq1 x30-block" data-id="1:2272"></div>
					</div>
					<div className="x60-block-xucsMm x60-block" data-id="1:2273">
						<div className="x30-block-ntB0Y8 x30-block" data-id="1:2274"></div>
						<div className="x30-block-Gy0CMT x30-block" data-id="1:2275"></div>
					</div>
					<div className="x60-block-6Z7sg3 x60-block" data-id="1:2276">
						<div className="x30-block-dE7CSC x30-block" data-id="1:2277"></div>
						<div className="x30-block-tr1OUi x30-block" data-id="1:2278"></div>
					</div>
					<div className="x60-block-zx2Bs5 x60-block" data-id="1:2279">
						<div className="x30-block-16HE9i x30-block" data-id="1:2280"></div>
						<div className="x30-block-2zjxRn x30-block" data-id="1:2281"></div>
					</div>
					<div className="x60-block-rrpNq0 x60-block" data-id="1:2282">
						<div className="x30-block-aZPRc9 x30-block" data-id="1:2283"></div>
						<div className="x30-block-p34vSx x30-block" data-id="1:2284"></div>
					</div>
					<div className="x60-block-5YuRlk x60-block" data-id="1:2285">
						<div className="x30-block-dxbp5E x30-block" data-id="1:2286"></div>
						<div className="x30-block-TLB3xb x30-block" data-id="1:2287"></div>
					</div>
				</div>
				<div className="time-sXpEo6 valign-text-middle time text-xsmedium" data-id="1:2252">
					8 AM
				</div>
			</div>
			<div className="hour-row-xImMAk hour-row" data-id="1:2196">
				<div className="time-acMRJZ valign-text-middle time text-xsmedium" data-id="1:2197">
					9 AM
				</div>
				<div className="blocks" data-id="1:2198">
					<div className="x60-block-dRb44b x60-block" data-id="1:2221">
						<div className="x30-block-fjv9xb x30-block" data-id="1:2222"></div>
						<div className="x30-block-ZtzyiP x30-block" data-id="1:2223"></div>
					</div>
					<div className="x60-block-uxiZTQ x60-block" data-id="1:2224">
						<div className="x30-block-BM1n7Z x30-block" data-id="1:2225"></div>
						<div className="x30-block-VCww3v x30-block" data-id="1:2226"></div>
					</div>
					<div className="x60-block-Dfjn1F x60-block" data-id="1:2227">
						<div className="x30-block-SxrGfx x30-block" data-id="1:2228"></div>
						<div className="x30-block-BAvJXC x30-block" data-id="1:2229"></div>
					</div>
					<div className="x60-block-CpEh1f x60-block" data-id="1:2230">
						<div className="x30-block-OXrkN9 x30-block" data-id="1:2231"></div>
						<div className="x30-block-KQyRZq x30-block" data-id="1:2232"></div>
					</div>
					<div className="x60-block-AxBJHp x60-block" data-id="1:2233">
						<div className="x30-block-pWWnap x30-block" data-id="1:2234"></div>
						<div className="x30-block-Y7BwvE x30-block" data-id="1:2235"></div>
					</div>
					<div className="x60-block-QBMPcf x60-block" data-id="1:2236">
						<div className="x30-block-6VWxR1 x30-block" data-id="1:2237"></div>
						<div className="x30-block-VPGIKq x30-block" data-id="1:2238"></div>
					</div>
					<div className="x60-block-AugpkB x60-block" data-id="1:2239">
						<div className="x30-block-9IIW3Z x30-block" data-id="1:2240"></div>
						<div className="x30-block-6mvKxF x30-block" data-id="1:2241"></div>
					</div>
				</div>
				<div className="time-mHc6FS valign-text-middle time text-xsmedium" data-id="1:2206">
					9 AM
				</div>
			</div>
			<div className="hour-row-6hhqWz hour-row" data-id="1:2150">
				<div className="time-uZhaPe valign-text-middle time text-xsmedium" data-id="1:2151">
					10 AM
				</div>
				<div className="blocks" data-id="1:2152">
					<div className="x60-block-rUVS6o x60-block" data-id="1:2175">
						<div className="x30-block-YLKU2z x30-block" data-id="1:2176"></div>
						<div className="x30-block-CGxWfs x30-block" data-id="1:2177"></div>
					</div>
					<div className="x60-block-owXQJl x60-block" data-id="1:2178">
						<div className="x30-block-0ABJb2 x30-block" data-id="1:2179"></div>
						<div className="x30-block-JcK9fk x30-block" data-id="1:2180"></div>
					</div>
					<div className="x60-block-Uu6iDO x60-block" data-id="1:2181">
						<div className="x30-block-SiGsx3 x30-block" data-id="1:2182"></div>
						<div className="x30-block-MZIGku x30-block" data-id="1:2183"></div>
					</div>
					<div className="x60-block-e5xpLj x60-block" data-id="1:2184">
						<div className="x30-block-ohpwi5 x30-block" data-id="1:2185"></div>
						<div className="x30-block-mjqwlV x30-block" data-id="1:2186"></div>
					</div>
					<div className="x60-block-Ebgz0D x60-block" data-id="1:2187">
						<div className="x30-block-rVegh7 x30-block" data-id="1:2188"></div>
						<div className="x30-block-xKGSQo x30-block" data-id="1:2189"></div>
					</div>
					<div className="x60-block-6z0clt x60-block" data-id="1:2190">
						<div className="x30-block-T9zHLr x30-block" data-id="1:2191"></div>
						<div className="x30-block-ZDcTQP x30-block" data-id="1:2192"></div>
					</div>
					<div className="x60-block-l2ZP8a x60-block" data-id="1:2193">
						<div className="x30-block-hOaoOA x30-block" data-id="1:2194"></div>
						<div className="x30-block-PNYTA1 x30-block" data-id="1:2195"></div>
					</div>
				</div>
				<div className="time-zt4euV valign-text-middle time text-xsmedium" data-id="1:2160">
					10 AM
				</div>
			</div>
			<div className="hour-row-e8OJER hour-row" data-id="1:2104">
				<div className="time-bc6Zr9 valign-text-middle time text-xsmedium" data-id="1:2105">
					11 AM
				</div>
				<div className="blocks" data-id="1:2106">
					<div className="x60-block-50W78h x60-block" data-id="1:2129">
						<div className="x30-block-7CoWRV x30-block" data-id="1:2130"></div>
						<div className="x30-block-XWr7WK x30-block" data-id="1:2131"></div>
					</div>
					<div className="x60-block-429CGf x60-block" data-id="1:2132">
						<div className="x30-block-3wXIIb x30-block" data-id="1:2133"></div>
						<div className="x30-block-g7MiZW x30-block" data-id="1:2134"></div>
					</div>
					<div className="x60-block-R1rpCH x60-block" data-id="1:2135">
						<div className="x30-block-DT4yfp x30-block" data-id="1:2136"></div>
						<div className="x30-block-BNx7vb x30-block" data-id="1:2137"></div>
					</div>
					<div className="x60-block-3lxHg6 x60-block" data-id="1:2138">
						<div className="x30-block-rYmAf0 x30-block" data-id="1:2139"></div>
						<div className="x30-block-ZlPsre x30-block" data-id="1:2140"></div>
					</div>
					<div className="x60-block-JuvWkm x60-block" data-id="1:2141">
						<div className="x30-block-qGb7u1 x30-block" data-id="1:2142"></div>
						<div className="x30-block-XyFZLP x30-block" data-id="1:2143"></div>
					</div>
					<div className="x60-block-sydVzJ x60-block" data-id="1:2144">
						<div className="x30-block-2RYQ0r x30-block" data-id="1:2145"></div>
						<div className="x30-block-d2qQnf x30-block" data-id="1:2146"></div>
					</div>
					<div className="x60-block-RDmWwE x60-block" data-id="1:2147">
						<div className="x30-block-Q64cVe x30-block" data-id="1:2148"></div>
						<div className="x30-block-Uf4wcz x30-block" data-id="1:2149"></div>
					</div>
				</div>
				<div className="time-jVC9mj valign-text-middle time text-xsmedium" data-id="1:2114">
					11 AM
				</div>
			</div>
			<div className="hour-row-4xJkjy hour-row" data-id="1:2058">
				<div className="time-HxMySG valign-text-middle time text-xsmedium" data-id="1:2059">
					12 PM
				</div>
				<div className="blocks" data-id="1:2060">
					<div className="x60-block-9jxiiu x60-block" data-id="1:2083">
						<div className="x30-block-QvYoZl x30-block" data-id="1:2084"></div>
						<div className="x30-block-HxEw9j x30-block" data-id="1:2085"></div>
					</div>
					<div className="x60-block-khJ3rJ x60-block" data-id="1:2086">
						<div className="x30-block-3Jm1I6 x30-block" data-id="1:2087"></div>
						<div className="x30-block-EoE2Yk x30-block" data-id="1:2088"></div>
					</div>
					<div className="x60-block-dP4AKm x60-block" data-id="1:2089">
						<div className="x30-block-e33v2B x30-block" data-id="1:2090"></div>
						<div className="x30-block-MTGEQ4 x30-block" data-id="1:2091"></div>
					</div>
					<div className="x60-block-UMl8Ii x60-block" data-id="1:2092">
						<div className="x30-block-hgODKk x30-block" data-id="1:2093"></div>
						<div className="x30-block-vmhBje x30-block" data-id="1:2094"></div>
					</div>
					<div className="x60-block-4m9mPy x60-block" data-id="1:2095">
						<div className="x30-block-N9nAWl x30-block" data-id="1:2096"></div>
						<div className="x30-block-26KxHm x30-block" data-id="1:2097"></div>
					</div>
					<div className="x60-block-1gkGT3 x60-block" data-id="1:2098">
						<div className="x30-block-zZRyWs x30-block" data-id="1:2099"></div>
						<div className="x30-block-u8x4WW x30-block" data-id="1:2100"></div>
					</div>
					<div className="x60-block-yzON5b x60-block" data-id="1:2101">
						<div className="x30-block-0DiEGn x30-block" data-id="1:2102"></div>
						<div className="x30-block-kvrOHc x30-block" data-id="1:2103"></div>
					</div>
				</div>
				<div className="time-GGxFAK valign-text-middle time text-xsmedium" data-id="1:2068">
					12 PM
				</div>
			</div>
			<div className="hour-row-TdWcao hour-row" data-id="1:2012">
				<div className="time-gy7rjc valign-text-middle time text-xsmedium" data-id="1:2013">
					1 PM
				</div>
				<div className="blocks" data-id="1:2014">
					<div className="x60-block-C2v4Zq x60-block" data-id="1:2037">
						<div className="x30-block-r34xHO x30-block" data-id="1:2038"></div>
						<div className="x30-block-fCW1vT x30-block" data-id="1:2039"></div>
					</div>
					<div className="x60-block-uxRrY5 x60-block" data-id="1:2040">
						<div className="x30-block-oG1KUO x30-block" data-id="1:2041"></div>
						<div className="x30-block-CrVRQB x30-block" data-id="1:2042"></div>
					</div>
					<div className="x60-block-j2FnzS x60-block" data-id="1:2043">
						<div className="x30-block-ggzrgk x30-block" data-id="1:2044"></div>
						<div className="x30-block-JW2rum x30-block" data-id="1:2045"></div>
					</div>
					<div className="x60-block-5EVfhk x60-block" data-id="1:2046">
						<div className="x30-block-HyxPCe x30-block" data-id="1:2047"></div>
						<div className="x30-block-o6H9Ju x30-block" data-id="1:2048"></div>
					</div>
					<div className="x60-block-7TR3gS x60-block" data-id="1:2049">
						<div className="x30-block-lUxS7r x30-block" data-id="1:2050"></div>
						<div className="x30-block-SKDShG x30-block" data-id="1:2051"></div>
					</div>
					<div className="x60-block-Jx5DFP x60-block" data-id="1:2052">
						<div className="x30-block-928rJw x30-block" data-id="1:2053"></div>
						<div className="x30-block-jAZx0o x30-block" data-id="1:2054"></div>
					</div>
					<div className="x60-block-4e9i1V x60-block" data-id="1:2055">
						<div className="x30-block-DeoXPt x30-block" data-id="1:2056"></div>
						<div className="x30-block-m9UOzn x30-block" data-id="1:2057"></div>
					</div>
				</div>
				<div className="time-2VMBY0 valign-text-middle time text-xsmedium" data-id="1:2022">
					1 PM
				</div>
			</div>
			<div className="hour-row-98yahg hour-row" data-id="1:1966">
				<div className="time-HKECmm valign-text-middle time text-xsmedium" data-id="1:1967">
					2 PM
				</div>
				<div className="blocks" data-id="1:1968">
					<div className="x60-block-9nOGhV x60-block" data-id="1:1991">
						<div className="x30-block-tNsOxx x30-block" data-id="1:1992"></div>
						<div className="x30-block-kOxKkc x30-block" data-id="1:1993"></div>
					</div>
					<div className="x60-block-3FjSbC x60-block" data-id="1:1994">
						<div className="x30-block-7I76Ng x30-block" data-id="1:1995"></div>
						<div className="x30-block-V8wxsS x30-block" data-id="1:1996"></div>
					</div>
					<div className="x60-block-WTcgmQ x60-block" data-id="1:1997">
						<div className="x30-block-kxRazJ x30-block" data-id="1:1998"></div>
						<div className="x30-block-EkJjBB x30-block" data-id="1:1999"></div>
					</div>
					<div className="x60-block-Gopjbj x60-block" data-id="1:2000">
						<div className="x30-block-XleD6A x30-block" data-id="1:2001"></div>
						<div className="x30-block-xGJwlR x30-block" data-id="1:2002"></div>
					</div>
					<div className="x60-block-pRDGx6 x60-block" data-id="1:2003">
						<div className="x30-block-brLZs5 x30-block" data-id="1:2004"></div>
						<div className="x30-block-8nOgvx x30-block" data-id="1:2005"></div>
					</div>
					<div className="x60-block-xD3YSz x60-block" data-id="1:2006">
						<div className="x30-block-enZcPP x30-block" data-id="1:2007"></div>
						<div className="x30-block-0U7WiU x30-block" data-id="1:2008"></div>
					</div>
					<div className="x60-block-OH1f1h x60-block" data-id="1:2009">
						<div className="x30-block-CyxxKq x30-block" data-id="1:2010"></div>
						<div className="x30-block-1vmvEx x30-block" data-id="1:2011"></div>
					</div>
				</div>
				<div className="time-DC7tHM valign-text-middle time text-xsmedium" data-id="1:1976">
					2 PM
				</div>
			</div>
			<div className="hour-row-hHziBE hour-row" data-id="1:1920">
				<div className="time-zwBSvP valign-text-middle time text-xsmedium" data-id="1:1921">
					3 PM
				</div>
				<div className="blocks" data-id="1:1922">
					<div className="x60-block-qwasPj x60-block" data-id="1:1945">
						<div className="x30-block-V4zxXm x30-block" data-id="1:1946"></div>
						<div className="x30-block-vQZAXc x30-block" data-id="1:1947"></div>
					</div>
					<div className="x60-block-Qoj9mK x60-block" data-id="1:1948">
						<div className="x30-block-WJPWDy x30-block" data-id="1:1949"></div>
						<div className="x30-block-PjMxU7 x30-block" data-id="1:1950"></div>
					</div>
					<div className="x60-block-EBLq3M x60-block" data-id="1:1951">
						<div className="x30-block-Ryexxr x30-block" data-id="1:1952"></div>
						<div className="x30-block-TaE3cH x30-block" data-id="1:1953"></div>
					</div>
					<div className="x60-block-pO8NUo x60-block" data-id="1:1954">
						<div className="x30-block-XD5an5 x30-block" data-id="1:1955"></div>
						<div className="x30-block-QRUpxk x30-block" data-id="1:1956"></div>
					</div>
					<div className="x60-block-xt5RCg x60-block" data-id="1:1957">
						<div className="x30-block-mUKARD x30-block" data-id="1:1958"></div>
						<div className="x30-block-7wFQYc x30-block" data-id="1:1959"></div>
					</div>
					<div className="x60-block-m26UHL x60-block" data-id="1:1960">
						<div className="x30-block-tec3AH x30-block" data-id="1:1961"></div>
						<div className="x30-block-jFWMSQ x30-block" data-id="1:1962"></div>
					</div>
					<div className="x60-block-1cr0x5 x60-block" data-id="1:1963">
						<div className="x30-block-3cABes x30-block" data-id="1:1964"></div>
						<div className="x30-block-iTxUjK x30-block" data-id="1:1965"></div>
					</div>
				</div>
				<div className="time-mZ3L84 valign-text-middle time text-xsmedium" data-id="1:1930">
					3 PM
				</div>
			</div>
			<div className="hour-row-cF4JFo hour-row" data-id="1:1874">
				<div className="time-XLc5FN valign-text-middle time text-xsmedium" data-id="1:1875">
					4 PM
				</div>
				<div className="blocks" data-id="1:1876">
					<div className="x60-block-LhKMxC x60-block" data-id="1:1899">
						<div className="x30-block-WsblrC x30-block" data-id="1:1900"></div>
						<div className="x30-block-h75T8Z x30-block" data-id="1:1901"></div>
					</div>
					<div className="x60-block-1ooimk x60-block" data-id="1:1902">
						<div className="x30-block-IuOuWi x30-block" data-id="1:1903"></div>
						<div className="x30-block-69FjKC x30-block" data-id="1:1904"></div>
					</div>
					<div className="x60-block-XTxSjB x60-block" data-id="1:1905">
						<div className="x30-block-c2qkAR x30-block" data-id="1:1906"></div>
						<div className="x30-block-CUP235 x30-block" data-id="1:1907"></div>
					</div>
					<div className="x60-block-tBco3U x60-block" data-id="1:1908">
						<div className="x30-block-9mQnWL x30-block" data-id="1:1909"></div>
						<div className="x30-block-7Ck1No x30-block" data-id="1:1910"></div>
					</div>
					<div className="x60-block-KMYASZ x60-block" data-id="1:1911">
						<div className="x30-block-4ml584 x30-block" data-id="1:1912"></div>
						<div className="x30-block-G7xd1J x30-block" data-id="1:1913"></div>
					</div>
					<div className="x60-block-Wx0BW1 x60-block" data-id="1:1914">
						<div className="x30-block-SJ2lUT x30-block" data-id="1:1915"></div>
						<div className="x30-block-snx9He x30-block" data-id="1:1916"></div>
					</div>
					<div className="x60-block-iusdsA x60-block" data-id="1:1917">
						<div className="x30-block-jY8Cav x30-block" data-id="1:1918"></div>
						<div className="x30-block-ZoWsNt x30-block" data-id="1:1919"></div>
					</div>
				</div>
				<div className="time-BxIfIo valign-text-middle time text-xsmedium" data-id="1:1884">
					4 PM
				</div>
			</div>
			<div className="hour-row-kqvD3B hour-row" data-id="1:1828">
				<div className="time-gBy1u4 valign-text-middle time text-xsmedium" data-id="1:1829">
					5 PM
				</div>
				<div className="blocks" data-id="1:1830">
					<div className="x60-block-j7pj8J x60-block" data-id="1:1853">
						<div className="x30-block-Nxylvl x30-block" data-id="1:1854"></div>
						<div className="x30-block-wvJJ8H x30-block" data-id="1:1855"></div>
					</div>
					<div className="x60-block-f5QzDD x60-block" data-id="1:1856">
						<div className="x30-block-buxkNq x30-block" data-id="1:1857"></div>
						<div className="x30-block-l0KvAC x30-block" data-id="1:1858"></div>
					</div>
					<div className="x60-block-fAEPro x60-block" data-id="1:1859">
						<div className="x30-block-XBkjuF x30-block" data-id="1:1860"></div>
						<div className="x30-block-lMKgSx x30-block" data-id="1:1861"></div>
					</div>
					<div className="x60-block-NQGiK2 x60-block" data-id="1:1862">
						<div className="x30-block-Yaeguk x30-block" data-id="1:1863"></div>
						<div className="x30-block-JyyJRD x30-block" data-id="1:1864"></div>
					</div>
					<div className="x60-block-Xx5mhG x60-block" data-id="1:1865">
						<div className="x30-block-2E8yyx x30-block" data-id="1:1866"></div>
						<div className="x30-block-poTzoK x30-block" data-id="1:1867"></div>
					</div>
					<div className="x60-block-oIqfsJ x60-block" data-id="1:1868">
						<div className="x30-block-VqEa9L x30-block" data-id="1:1869"></div>
						<div className="x30-block-xsmPiv x30-block" data-id="1:1870"></div>
					</div>
					<div className="x60-block-Z9DuEh x60-block" data-id="1:1871">
						<div className="x30-block-GzSMFZ x30-block" data-id="1:1872"></div>
						<div className="x30-block-ocJ2BU x30-block" data-id="1:1873"></div>
					</div>
				</div>
				<div className="time-5CPL7g valign-text-middle time text-xsmedium" data-id="1:1838">
					5 PM
				</div>
			</div> */}
		</div>
	);
}
