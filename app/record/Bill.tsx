import { GameRecordMap } from '@/common/data';
import billCalculator from '@/lib/billCalculator';

type Props = {
  record: GameRecordMap;
  amount: number;
};

export default function Bill({ record, amount }: Props) {
  const bills = billCalculator(record, amount);
  const senders = [...bills.keys()];

  return (
    <div className='flex w-full gap-6 flex-wrap justify-center '>
      <div className='bg-orange-50 self-start rounded-md overflow-hidden shadow'>
        <span className='block text-center py-2 px-4 bg-orange-300'>(보내는 이)</span>
        <div className='py-2 px-4 flex flex-col items-center gap-2'>
          <span>(받는 이): (금액)</span>
          <span>···</span>
        </div>
      </div>
      {senders.map((sender) => (
        <div key={`${sender}-bill`} className='bg-orange-50 self-start rounded-md overflow-hidden shadow'>
          <span className='block text-center py-2 px-4 bg-orange-300'>{sender}</span>
          <div className='py-2 px-4 flex flex-col items-center gap-2'>
            {bills.get(sender)!.map(({ receiver, amount }) => (
              <span key={`${sender}-${receiver}`}>{`${receiver}: ${amount}`}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
