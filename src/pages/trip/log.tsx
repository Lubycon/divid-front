import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import useModal from 'hooks/useModal';
import Profile, { IconSize } from 'components/profile';
import { Heading5 as Amount, CaptionBold, Badge, Caption } from 'styles/typography';
import { numberWithCommas } from 'utils';
import { Animals } from 'api/types';
import { CalculateDetail } from 'model/expense';
import { flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import { Link } from 'react-router-dom';
import ButtonModal from 'components/modal/button-modal';
import { useDeleteExpense } from 'hooks/data/useExpense';

const Wrap = styled.div`
  width: 100%;
  background-color: ${color.white};
  margin-bottom: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
`;

const DetailWrap = styled.div`
  ${flexAlignCenter};
  margin: ${pxToVw(8)} 0;
  justify-content: flex-end;

  ${mediaQuery(640)} {
    margin: 8px 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled(Caption)`
  color: ${color.grayscale.gray01};
  margin-left: ${pxToVw(4)};

  span {
    font-weight: 600;
    margin-right: 12px;
  }

  ${mediaQuery(640)} {
    margin-left: 4px;
  }
`;

const Nothing = styled(Caption)`
  text-align: right;
  margin-top: ${pxToVw(16)};
  color: ${color.grayscale.gray03};

  ${mediaQuery(640)} {
    margin-top: 16px;
  }
`;

const MainContents = styled.div`
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88px;
  background-color: ${color.white};
`;

const SubContents = styled.div`
  padding: 0 16px;
`;

const flexBox = css`
  display: flex;
  align-items: center;
`;

const Hr = styled.div`
  width: 100%;
  border: none;
  border-top: 1px solid ${color.grayscale.gray05};
  margin-bottom: 16px;
`;

interface LogProps {
  expender: string;
  profile: Animals;
  amount: number;
  desc: string;
  isMe: boolean;
  expenseId: number;
  tripId: string;
  details: CalculateDetail[];
}

export default function Log({ expenseId, tripId, expender, profile, amount, desc, isMe, details }: LogProps) {
  const [isToggle, setIsToggle] = useState(false);
  const { refetch: deleteExpense } = useDeleteExpense(tripId || '', expenseId.toString() || '');

  const DeleteModalContents = (
    <ButtonModal
      type="delete"
      title="정말 삭제하시겠어요?"
      body="삭제한 내역은 복구가 안 돼요"
      buttons={{
        left: {
          label: '취소'
        },
        right: {
          label: '삭제',
          handleClick: () => {
            deleteExpense();
          }
        }
      }}
    />
  );

  const { handleOpen: openDeleteModal, renderModal: renderDeleteModal } = useModal({
    children: DeleteModalContents
  });

  return (
    <>
      {renderDeleteModal()}

      <div>
        {/* <Link to={`/editExpense?tripId=${tripId}&expenseId=${expenseId}`}> */}
        <Wrap>
          <MainContents onClick={() => setIsToggle(!isToggle)}>
            <div css={flexBox}>
              <Profile iconSize={IconSize.SM} type={profile} isMe={isMe} hasName nickName={expender} />
            </div>
            <div
              css={css`
                text-align: right;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              `}
            >
              <div css={flexBox}>
                <Amount>{numberWithCommas(amount)}</Amount>
                <CaptionBold>원</CaptionBold>
              </div>
              <Badge
                css={css`
                  color: ${color.grayscale.gray03};
                `}
              >
                {desc}
              </Badge>
            </div>
          </MainContents>
          {isToggle && (
            <SubContents>
              <Hr />
              {details.length ? (
                details.map((el, i) => (
                  <DetailWrap key={i}>
                    <Profile type={el.profileImg} iconSize={IconSize.SM} />
                    <Text>
                      <span>{el.nickName}</span>
                      {numberWithCommas(el.price)}원
                    </Text>
                  </DetailWrap>
                ))
              ) : (
                <Nothing>줄 내역이 없습니다.</Nothing>
              )}
              <button type="button" onClick={openDeleteModal}>
                삭제
              </button>
              <Link to={`/editExpense?tripId=${tripId}&expenseId=${expenseId}`}>수정</Link>
            </SubContents>
          )}
        </Wrap>
      </div>
    </>
  );
}
