const arrF = require('./arr');
const swapItems = arrF.swapItems;

describe('swapItems Function Testing', () =>
{
	var args = 
	[
		undefined,
		null,
		true,
		false,
		4,
		3.7,
		-2,
		0,
		'',
		'a string',
		[],
		[true, 2, 'three'],
		{},
		{p1:true,p2:2,p3:'three'}
	];
	describe('bad arguments', () =>
	{
		var errs = {};

		test('no arguments', () =>
		{
			expect(swapItems()).toEqual( undefined );
		});

		test('one argument', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 10 || i === 11)
					continue;
				try
				{
					expect(swapItems( args[i] )).toEqual( args[i] );
				}
				catch(err)
				{
					var newKey = String(args[i]);
					newKey = newKey.replace(/\s+/g, '');
					errs[newKey] = String(err);
				}
			}
		});

		test('Two arguments', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 10 || i === 11)
					continue;
				for (let j = 0; j < args.length; j++)
				{
					try
					{
						expect(swapItems(args[i], args[j] )).toEqual( args[i] );
					}
					catch(err)
					{
						var newKey = String(args[i]) + "_" + String(args[j]);
						newKey = newKey.replace(/\s+/g, '');
						errs[newKey] = String(err);
					}
				}
			}
		});
		
		describe('three arguments', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 10 || i === 11)
					continue;
				for (let j = 0; j < args.length; j++)
				{
					for (let k = 0; k < args.length; k++)
					{
						try
						{
							expect(swapItems(args[i], args[j], args[k] )).toEqual( args[i] );
						}
						catch(err)
						{
							var newKey = String(args[i]) + '_' + String(args[j]) + '_' + String(args[k]);
							newKey = newKey.replace(/\s+/g, '');
							errs[newKey] = String(err);
						}
					}
				}
			}
		});

// Uncomment the following lines to look at the produced Errors.
// The bottom line has the highest information provided to lines printed ratio.
		// console.log(errs);
		// console.log(Object.keys(errs));
		new Set(Object.values(errs)).forEach(x => console.log(x));
	});

	describe('good array, bad swap indices', () =>
	{
	// No changes to the array when neither index is valid (an inbounds positive integer)
		test('one nonsense index', () =>
		{
			for (let i = 10; i < 12; i++)
			{
				for (let j = 0; j < args.lenth; j++)
				{
					if (j === 7)
						continue;
					expect(swapItems(args[i], args[j])).toEqual( args[i] )
				}
			}
		});

		test('two nonsense indices', () =>
		{
			for (let i = 10; i < 12; i++)
			{
				for (let j = 0; j < args.length; j++)
				{
					if (j === 7)
						continue;
					for (let k = 0; k < args.lengthl; k++)
					{
						if (k === 4 || k === 7)
							contniue;
						expect(swapItems( args[i], args[j], args[k] )).toEqual( args[i] );
					}
				}
			}
		});

		test('two indices, one nonsense', () =>
		{
			for (let i = 10; i < 12; i++)
			{
				for (let j = 0; j < args.length; j++)
				{
					for (let k = 0; k < args.lengthl; k++)
					{
						if (j === 7 && k === 7)
							contniue;
						expect(swapItems( args[i], args[j], args[k] )).toEqual( args[i] );
					}
				}
			}
		})
	});

	test('Good Array, Valid swap indices', () =>
	{
		var arr = [ true, 2, 'three' ];
		arrSwapped = [ true, 'three', 2 ];

		// Used as expected
		expect(swapItems(arr, 1, 2)).toEqual(arrSwapped);
		expect(swapItems(arr, 2, 1)).toEqual(arrSwapped);

		// Swap item with iteself -> no changes
		expect(swapItems(arr, 1, 1)).toEqual(arr);

		// Out of bounds index -> swaps the defined value with the undefined out of bounds value and extends the array to that out of bounds index to include the defined value, filling the additional spots with undefined values.
		expect(swapItems(arr, 4, 1)).toEqual( [true, undefined, 'three', undefined, 2] );

		// Negative index -> swaps in an undefined value.
		// This throws an error: expected different than received, but then shows two identical arrays. I believe the received array is attempting to include the defined value now at index location -3, but of course can't.
		expect(swapItems(arr, -3, 2)).toEqual( [true, 2, undefined] );
	});
});