const arrF = require('./arr');
const indexOfBy = arrF.indexOfBy;

describe('indexOfBy Function Testing', () =>
{
	describe('bad arguments', () =>
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

		var errs = {};

		test('no arguments', () =>
		{
			expect(indexOfBy()).toBe(-1);
		});

		test('one argument', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 11)
					result = true;
				else
					result = -1;

				try { expect(indexOfBy( args[i] )).toBe(result); }
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
				for (let j = 0; j < args.length; j++)
				{
					if ( i === 11)
						result = true;
					else
						result = -1;

					try { expect(indexOfBy(args[i], args[j] )).toBe(result); }
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
				for (let j = 0; j < args.length; j++)
				{
					for (let k = 0; k < args.length; k++)
					{
// When prop value is undefined it just takes the first item in the array, assuming an array (or a string) was passed in.
						if (i === 11 && k === 0)
							result = 0;
						else if (i === 9 && k === 0 && j !== 7)
							result = 0;
						else
							result = -1;

						try { expect(indexOfBy(args[i], args[j], args[k] )).toBe(result); }
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
		// new Set(Object.values(errs)).forEach(x => console.log(x));
	});

	test('Testing function with good arguements - array of objects', () =>
	{
// The default property value argument is undefined.

// If a property name for which all objects have a definition is passed in,
// and no property value is given, such an object would not exist in the array

// If a property name no object has is passed in with no property value,
// all objects would satisfy as obj['badPropName'] = undefined always.

		function chair(material,numLegs,comfy)
		{
			this.material = material;
			this.legs = numLegs;
			this.comfy = comfy;
		}

		var chair1 = new chair('wood', 4, true);
		var chair2 = new chair('plastic', 3, false);
		var chair3 = new chair('metal', 'four', 'no');
		var chair4 = new chair('fabric', 'none', 1);

		var chairs = [chair1, chair2, chair3,chair4];

		expect(indexOfBy(chairs)).toBe(0);

		// good prop name, undefined prop value -> doesn't exist in array
		expect(indexOfBy(chairs, 'comfy')).toBe(-1); 

		// bad prop name, undefined prop value -> all items satisfy
		expect(indexOfBy(chairs, 'badPropertyName')).toBe(0);

		// good prop name, specific prop value -> specific item will satisfy
		expect(indexOfBy(chairs, 'comfy', false)).toBe(1);
		expect(indexOfBy(chairs, 'material', 'metal')).toBe(2);
		// good prop name, specific prop value -> no item satsified
		expect(indexOfBy(chairs, 'comfy', 'a value no obj has for that property')).toBe(-1);

		// bad prop name, specific prop value -> no items satisfy
		expect(indexOfBy(chairs, 'badPropertyName', 'a value')).toBe(-1);


	});
});