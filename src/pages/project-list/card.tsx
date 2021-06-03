import React, { useState } from 'react';
import useModal from 'hooks/useModal';
import ButtonModal from 'components/modal/button-modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { mediaQuery } from 'styles/media';
import { changeStringToDate, makeDateFormat } from 'utils';
import { Heading4 as Title, Heading7 } from 'styles/typography';
import color from 'styles/colors';
import { MemberInfo } from 'model/members';
import Members from 'components/members';

const CardWrap = styled.div<{ isCurrent: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  border: ${({ isCurrent }) => (isCurrent ? `2px solid ${color.primary}` : `1px solid ${color.grayscale.gray05}`)};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: ${({ isCurrent }) => isCurrent && '0px 4px 16px rgba(88, 90, 241, 0.2)'};
`;

const CardLink = styled(Link)`
  z-index: 0;
  width: 100%;
  padding: 24px 16px;
`;

const MoreWrap = styled.div`
  margin: 24px 16px 0 0;
  position: relative;
  z-index: 1;
`;

const More = styled.div`
  width: 24px;
  height: 24px;
  background: url('./images/ico_more.svg') center no-repeat;
  background-size: contain;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Desc = styled(Heading7)`
  color: ${color.grayscale.gray02};
  margin-bottom: 28px;

  ${mediaQuery(640)} {
    margin-bottom: 56px;
  }
`;

const MoreModal = styled.div`
  width: 200px;
  height: 137px;
  position: absolute;
  top: 13px;
  right: -36px;
  padding: 0 36px;
  box-sizing: border-box;
  background: url('/images/modal_sm.svg') center no-repeat;
  background-size: auto;
  z-index: 3;
`;

const MoreButton = styled(Heading7)`
  padding: 10px 0;
  line-height: 1;
  cursor: pointer;

  &:first-of-type {
    margin-top: 36px;
  }
`;

interface CardProps {
  tripId: string;
  tripName: string;
  startDate: string;
  endDate: string;
  memberCnt: number;
  members: MemberInfo[];
  isCurrent?: boolean;
}

export default function Card({
  tripId,
  tripName,
  startDate,
  endDate,
  memberCnt,
  isCurrent = false,
  members
}: CardProps) {
  const [openMore, setOpenMore] = useState(false);
  const sDate = changeStringToDate(startDate);
  const eDate = changeStringToDate(endDate);

  const GetoutModalContents = (
    <ButtonModal
      title="정말 여행에서 나가시겠어요?"
      body="여행 정산 내역을 더 이상 볼 수 없어요"
      buttons={{
        left: {
          label: '취소',
          handleClick: () => {
            console.log('취소 클릭');
          }
        },
        right: {
          label: '나가기',
          handleClick: () => {
            console.log('나가기 클릭');
          }
        }
      }}
    />
  );

  const { handleOpen: openGetoutModal, renderModal: renderGetoutModal } = useModal({
    children: GetoutModalContents
  });

  return (
    <>
      {renderGetoutModal()}
      <CardWrap isCurrent={isCurrent}>
        <CardLink to={`/trips?tripId=${tripId}`}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Title>{tripName}</Title>
          </div>
          <Desc>{`${makeDateFormat(sDate)} - ${makeDateFormat(eDate)}, ${memberCnt}명`}</Desc>
          <Members members={members} />
        </CardLink>
        <MoreWrap>
          <More
            onClick={(e) => {
              e.stopPropagation();
              setOpenMore(true);
            }}
          />
          {openMore ? (
            <>
              <Overlay
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMore(false);
                }}
              />
              <MoreModal>
                <MoreButton onClick={() => console.log('수정')}>여행정보수정</MoreButton>
                <MoreButton
                  onClick={openGetoutModal}
                  css={css`
                    color: ${color.red};
                  `}
                >
                  나가기
                </MoreButton>
              </MoreModal>
            </>
          ) : null}
        </MoreWrap>
      </CardWrap>
    </>
  );
}
